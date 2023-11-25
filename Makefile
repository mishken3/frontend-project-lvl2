install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

local-publish:
	make publish
	npm link

test:
	npm test
