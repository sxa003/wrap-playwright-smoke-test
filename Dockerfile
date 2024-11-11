FROM docker-registry.hq.local/microsoft/playwright:v1.39.0-jammy

WORKDIR /app

# Install dependencies
RUN npm install @playwright/test@1.39.0
RUN yes | npx playwright install --with-deps
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Run playwright test
CMD [ "npx", "playwright", "test" ]