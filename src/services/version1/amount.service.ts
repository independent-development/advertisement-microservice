import { Injectable } from "@nestjs/common";

@Injectable()
export class AmountService {
  random_message_amount(calculate_value) {
    return calculate_value * 0.25;
  }
}
