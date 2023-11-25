import yaml from 'js-yaml';

const parseYAML = (file) => {
  const yamlFile = yaml.load(file);

  return yamlFile;
};

export { parseYAML };
