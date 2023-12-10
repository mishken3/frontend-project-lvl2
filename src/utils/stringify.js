import _ from 'lodash';

const stringify = (data, replacer = ' ', spacesCounter = 1) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }

    const indentSpace = depth * spacesCounter;
    const bracketIndentSize = indentSpace - spacesCounter;
    const currentIndent = replacer.repeat(indentSpace);
    const bracketIndent = replacer.repeat(bracketIndentSize);

    const lines = Object.entries(node).map(
      ([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(data, 1);
};

export { stringify };
