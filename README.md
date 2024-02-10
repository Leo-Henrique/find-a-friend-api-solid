# Find A Friend API SOLID

API REST com princípios do SOLID e alguns patterns com o objetivo de simular uma aplicação escalável e de fácil manutenção.

- [Requisitos de software](https://leo-henrique.notion.site/leo-henrique/Find-A-Friend-requisitos-de-software-1ba9ad1187e94d0f8482d22c820a68dd)
- [UI Design da comunidade](https://www.figma.com/file/1kpv8DUn53wnTCS1S5hKJV/Find-A-Friend-(APP)-(Community)?type=design&node-id=1-2&mode=design&t=OivsuwxDBKB2z7Vl-0)

## Principais tecnologias

- [TypeScript](https://www.typescriptlang.org/) - JavaScript com tipagem estática
- [Node.js](https://nodejs.org/) - interpretador do JavaScript em server-side
- [Fastify](https://fastify.dev/) - framework para construção do servidor
- [Prisma](https://www.prisma.io/) - ORM
- [Vitest](https://vitest.dev/) - framework de testes

## Principais conceitos

### Casos de uso (Use Cases / Services)

Implementação em baixo nível das funcionalidades do app com o **princípio da inversão de dependência**.

```ts
export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) throw new ResourceNotFoundError("org");

    return { org: serializeUser(org) };
  }
}
```

Isso permite que o caso de uso seja flexível e facilita a implementação de alguns patterns como mostrado a seguir.

### Repository Pattern

Abstração de toda operação feita no banco de dados seguindo o **princípio da responsabilidade única**.

Cada repositório implementa uma interface em forma de contrato que a mesma deve seguir:

```ts
export interface OrgsRepository {
  create(data: CreateOrg): Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findManyByCity(city: string): Promise<Org[]>;
}
```

Isso permite principalmente seguir um padrão ao escrever um repositório e não deixa o aplicativo dependente de framework ou banco de dados.

### Testes unitários com InMemoryTestDatabase

Utilizando Repository Pattern, basta criar novos repositórios implementando a interface base da entidade para garantir que o banco de dados em memória seja o mais próximo possível do banco de dados que será utilizado em produção.

Como os casos de uso seguem a inversão de dependência, basta utilizar os repositórios em memória ao instanciar os casos de uso nos testes unitários. Assim, é possível limpar o banco de dados antes de cada teste para se abster de contextos sem abrir mão da performance dos testes.

```ts
let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

let orgId: string;

describe("Get org profile Use Case", () => {
  beforeEach(async () => {
    // instância do caso de uso com o repositório em memória
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);

    const org = await orgsRepository.create({
      ...orgSpec,
      passwordHash: orgPasswordHashSpec,
    });

    orgId = org.id;
  });

  it("should be able get the org profile", async () => {
    const { org } = await sut.execute({ orgId });

    expect(org.id).toEqual(orgId);
  });
});
```

## Rode o projeto

Defina as variáveis de ambiente:

```zsh
cp env.example .env
```

Instale as dependências:

```zsh
pnpm install
```

Inicie o banco de dados:

```zsh
docker compose up -d && pnpm prisma migrate dev
```

Rode o projeto:

```zsh
# inicie o servidor em ambiente dev (você pode ver a documentação da API em "routes.http")
pnpm start:dev

# rode os testes unitários
pnpm test

# rode os testes end to end
pnpm test:e2e
```
