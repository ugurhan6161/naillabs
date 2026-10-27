import 'package:flutter_test/flutter_test.dart';
import 'package:nailab_app/main.dart';

void main() {
  testWidgets('NAILAB app renders home route', (WidgetTester tester) async {
    await tester.pumpWidget(const NailabApp());

    expect(find.text('NAILAB'), findsWidgets);
    expect(find.text('Mağazaya Git'), findsOneWidget);
  });
}
