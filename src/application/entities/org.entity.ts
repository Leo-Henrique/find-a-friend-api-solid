/*
  Types must be created without dependencies! This file is just an example.
*/
import PrismaModels, { Prisma } from "@prisma/client";

export type Org = PrismaModels.Org;

export type CreateOrg = Prisma.OrgCreateInput;
