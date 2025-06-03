FROM node

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app 

COPY . . 

RUN bun install

CMD ["bun", "run", "dev"]
