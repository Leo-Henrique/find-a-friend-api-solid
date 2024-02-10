import { randomUUID } from "crypto";
import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import multer, { MulterError } from "fastify-multer";
import {
  File,
  FileFilterCallback,
  Options,
} from "fastify-multer/lib/interfaces";
import { extension } from "mime-types";
import path, { extname } from "path";
import prettyBytes from "pretty-bytes";
import { HTTPError } from "../errors/HTTPError";
import { CustomMulterError } from "../errors/handlers/multer.HTTPError";

interface MemoryStorage {
  storage?: "memory";
}

interface DiskStorage {
  storage?: "disk";
  storageDir?: string;
}

type Storage = MemoryStorage | DiskStorage;

type RequireUploadOptions = Storage & {
  fieldName: string;
  allowedExtensions: string[];
  limits?: Pick<NonNullable<Options["limits"]>, "fileSize" | "files">;
  isRequiredUpload?: boolean;
};

const defaultOptions = {
  storage: "memory",
  storageDir: "./tmp",
  limits: {
    fileSize: 1000000 * 1,
    files: 1,
  },
  isRequiredUpload: true,
};

export function requireUpload(
  options: RequireUploadOptions = { fieldName: "", allowedExtensions: [] },
) {
  const {
    storage,
    storageDir,
    fieldName,
    allowedExtensions,
    limits,
    isRequiredUpload,
  } = {
    ...defaultOptions,
    ...options,
    limits: {
      ...defaultOptions.limits,
      ...(options.limits ? options.limits : {}),
    },
  };
  const handleStorage = () => {
    if (storage === "disk") {
      return multer.diskStorage({
        destination: storageDir,
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname);

          cb(null, `${randomUUID()}${ext}`);
        },
      });
    }

    return multer.memoryStorage();
  };
  const fileFilter = (
    _req: FastifyRequest,
    { mimetype, originalname }: File,
    cb: FileFilterCallback,
  ) => {
    const fileExtension = extension(mimetype) || extname(originalname);

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      const validExtensions = allowedExtensions.join(", ");

      cb(
        new CustomMulterError(
          400,
          `Invalid file format. Only use extensions: '${validExtensions}'.`,
        ),
      );
    }
  };
  const upload = multer({ limits, storage: handleStorage(), fileFilter });
  const isMultipleUpload = limits.files > 1;

  return [
    async (req: FastifyRequest) => {
      if (!req.headers["content-type"]?.includes("multipart/form-data")) {
        throw new HTTPError(
          406,
          "Request format error.",
          "The request must be of the multipart/form-data.",
        );
      }
    },
    function (
      this: FastifyInstance,
      req: FastifyRequest,
      res: FastifyReply,
      done: HookHandlerDoneFunction,
    ) {
      let middleware = upload.single(fieldName);

      if (isMultipleUpload) middleware = upload.array(fieldName);

      middleware.bind(this)(req, res, error => {
        const sendError = (statusCode: number, message: string) => {
          done(new CustomMulterError(statusCode, message));
        };

        if (error && error instanceof MulterError) {
          switch (error.code) {
            case "LIMIT_FILE_SIZE":
              return sendError(
                413,
                `The maximum file size of each file is ${prettyBytes(
                  limits.fileSize,
                )}.`,
              );

            case "LIMIT_FILE_COUNT":
              return sendError(
                413,
                `The maximum file count is ${limits.files}.`,
              );

            case "LIMIT_UNEXPECTED_FILE":
              return sendError(
                400,
                `The file field '${error.field}' is not allowed.`,
              );

            default:
              return done(error);
          }
        }

        if (error) return done(error);

        done();
      });
    },
    async (req: FastifyRequest) => {
      if (isRequiredUpload) {
        if (!isMultipleUpload && !req.file) {
          throw new CustomMulterError(
            400,
            `The field '${fieldName}' is required with a file.`,
          );
        }

        if (isMultipleUpload && (!req.files || !req.files.length)) {
          throw new CustomMulterError(
            400,
            `The field '${fieldName}' requires at minimum 1 file.`,
          );
        }
      }

      const body = req.body as Record<string, string>;
      const parsedStringValues = Object.keys(body).reduce(
        (obj, key) => {
          const value = body[key];

          try {
            obj[key] = JSON.parse(value);
          } catch {
            obj[key] = value;
          }

          return obj;
        },
        {} as typeof body,
      );

      req.body = parsedStringValues;
    },
  ];
}
