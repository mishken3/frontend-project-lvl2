import yaml from 'js-yaml';

export default (file) => {
  const yamlFile = yaml.load(file);

  return yamlFile;
};
