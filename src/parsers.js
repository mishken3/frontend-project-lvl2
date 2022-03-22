import { parse as YAMLParse } from 'yaml';

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return YAMLParse(data);
    default:
      throw new SyntaxError(`Wrong format. ${format} came`);
  }
};

export default parser;
