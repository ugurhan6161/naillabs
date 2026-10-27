String toTurkishTitle(String input) {
  final normalized = input.replaceAll('ı', 'I').replaceAll('i', 'İ');
  return normalized
      .replaceAll('I', 'I')
      .replaceAll('İ', 'İ')
      .toUpperCase();
}
