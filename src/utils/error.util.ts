export default class ErrorUtil {
  static parse(error: unknown) {
    const { message } = error as Error;
    return { message };
  }
}
