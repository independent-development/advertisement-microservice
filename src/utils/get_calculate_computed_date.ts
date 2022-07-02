import * as moment from "moment";
import { calculate_type_enums } from "@/emuns/calculate_type_enums";

export default function get_calculate_computed_date(
  calculate_type,
  calculate_value,
) {
  if (calculate_type_enums[calculate_type] === "YEAR") {
    return moment().add(calculate_value, "years").format("YYYY-MM-DD HH:mm:ss");
  }
  if (calculate_type_enums[calculate_type] === "MONTH") {
    return moment()
      .add(calculate_value, "months")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  if (calculate_type_enums[calculate_type] === "DAY") {
    return moment().add(calculate_value, "days").format("YYYY-MM-DD HH:mm:ss");
  }
  return moment().format("YYYY-MM-DD HH:mm:ss");
}
