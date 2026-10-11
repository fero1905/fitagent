import 'package:flutter_test/flutter_test.dart';

import 'package:fitagent_mobile/main.dart';

void main() {
  testWidgets('Welcome screen shows FitAgent branding', (WidgetTester tester) async {
    await tester.pumpWidget(const FitAgentApp());

    expect(find.text('FitAgent'), findsOneWidget);
    expect(find.text('Sana özel antrenman planı'), findsOneWidget);
    expect(find.text('Başlayalım'), findsOneWidget);
  });
}
