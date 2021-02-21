import loadable from "@loadable/component";

import rptis from "./rptis/module.json";
import bpls from "./bpls/module.json";

const modules = [bpls, rptis];

export const getModules = (partner) => {
  const pattern = partner.includeservices;
  if (!pattern) return [];

  const regex = new RegExp(`(${pattern})`, "i");
  const excludeRegex = partner.excludeservices
    ? new RegExp(`(${partner.excludeservices})`, "i")
    : null;

  const partnerModules = [...modules];
  partnerModules.forEach((module) => {
    const partnerServices = module.services.filter(
      (service) =>
        regex.test(service.name) &&
        (!excludeRegex || !excludeRegex.test(service.name))
    );
    module.services = partnerServices;
  });

  return partnerModules.filter((module) => module.services.length > 0);
};

export const getServiceComponent = (service) => {
  const ServiceComponent = loadable(() =>
    import(`./${service.module}/${service.name}/${service.component}`)
  );
  return ServiceComponent;
};

export default modules;
