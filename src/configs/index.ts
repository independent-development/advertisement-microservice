import * as local_config from "./config.local";
import * as test_config from "./config.test";
import * as prod_config from "./config.prod";

const current_config = {
  local: local_config,
  test: test_config,
  prod: prod_config,
}[process.env.ENV_VALUE];

export default current_config;
