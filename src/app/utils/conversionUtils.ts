export class ConversionUtils {
  public static dateToString(dateValue: Date): string {
    if (!dateValue) {
      return null;
    }

    return (
      dateValue.getFullYear().toString() +
      '-' +
      (dateValue.getMonth() + 1).toString() +
      '-' +
      dateValue.getDate().toString()
    );
  }

  public static dayOfWeekToString(dayOfWeek: number): string {
    switch (dayOfWeek) {
      case 0:
        return 'Domenica';
      case 1:
        return 'Lunedì';
      case 2:
        return 'Martedì';
      case 3:
        return 'Mercoledì';
      case 4:
        return 'Giovedì';
      case 5:
        return 'Venerdì';
      case 6:
        return 'Sabato';
    }
    return '';
  }
}
