import 'package:fitagent_mobile/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

Finder _labeledField(String label) => find.widgetWithText(TextFormField, label);

Future<void> _openProfile(WidgetTester tester) async {
  await tester.pumpWidget(const FitAgentApp());
  await tester.tap(find.text('Başlayalım'));
  await tester.pumpAndSettle();
}

Future<void> _tapContinue(WidgetTester tester) async {
  final continueButton = find.widgetWithText(FilledButton, 'Devam Et');
  await tester.ensureVisible(continueButton);
  await tester.tap(continueButton);
  await tester.pumpAndSettle();
}

Future<void> _fillValidProfile(
  WidgetTester tester, {
  String name = 'Ayşe',
  String age = '28',
  String height = '170',
  String weight = '62,5',
}) async {
  await tester.enterText(_labeledField('Ad'), name);
  await tester.enterText(_labeledField('Yaş'), age);
  await tester.enterText(_labeledField('Boy (cm)'), height);
  await tester.enterText(_labeledField('Kilo (kg)'), weight);
  await tester.ensureVisible(find.widgetWithText(FilterChip, 'Pazartesi'));
  await tester.tap(find.widgetWithText(FilterChip, 'Pazartesi'));
  await tester.pump();
}

void main() {
  testWidgets('boş formda Devam Et zorunlu alan hatalarını gösterir ve özeti açmaz',
      (tester) async {
    await _openProfile(tester);
    await _tapContinue(tester);

    expect(find.text('Ad gerekli'), findsOneWidget);
    expect(find.text('Yaş gerekli'), findsOneWidget);
    expect(find.text('Boy gerekli'), findsOneWidget);
    expect(find.text('Kilo gerekli'), findsOneWidget);
    expect(find.text('En az bir antrenman günü seçmelisin.'), findsOneWidget);
    expect(find.text('Profil özeti'), findsNothing);
  });

  testWidgets('yaş, boy ve kilo 0 veya negatif değeri reddeder ve özeti açmaz',
      (tester) async {
    await _openProfile(tester);

    await tester.enterText(_labeledField('Ad'), 'Ayşe');
    await tester.enterText(_labeledField('Yaş'), '0');
    await tester.enterText(_labeledField('Boy (cm)'), '0');
    await tester.enterText(_labeledField('Kilo (kg)'), '-5');
    await tester.ensureVisible(find.widgetWithText(FilterChip, 'Salı'));
    await tester.tap(find.widgetWithText(FilterChip, 'Salı'));
    await tester.pump();
    await _tapContinue(tester);

    expect(find.text('Yaş pozitif bir tam sayı olmalı'), findsOneWidget);
    expect(find.text('Boy pozitif bir sayı olmalı'), findsOneWidget);
    expect(find.text('Kilo pozitif bir sayı olmalı'), findsOneWidget);
    expect(find.text('Profil özeti'), findsNothing);

    await tester.enterText(_labeledField('Yaş'), '-3');
    await tester.enterText(_labeledField('Boy (cm)'), '-160');
    await tester.enterText(_labeledField('Kilo (kg)'), '0');
    await _tapContinue(tester);

    expect(find.text('Yaş pozitif bir tam sayı olmalı'), findsOneWidget);
    expect(find.text('Boy pozitif bir sayı olmalı'), findsOneWidget);
    expect(find.text('Kilo pozitif bir sayı olmalı'), findsOneWidget);
    expect(find.text('Profil özeti'), findsNothing);
  });

  testWidgets('özetten geri dönünce profil bilgileri korunur', (tester) async {
    await _openProfile(tester);
    await _fillValidProfile(tester);
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Örn. diz ağrısı, burpee yok'),
      'diz ağrısı',
    );
    await _tapContinue(tester);

    expect(find.text('Profil özeti'), findsOneWidget);
    expect(find.text('Ayşe'), findsOneWidget);
    expect(find.text('62.5 kg'), findsOneWidget);
    expect(find.text('Pazartesi'), findsWidgets);

    await tester.pageBack();
    await tester.pumpAndSettle();

    expect(find.text('Profil özeti'), findsNothing);
    expect(find.text('Profil'), findsOneWidget);
    expect(tester.widget<TextFormField>(_labeledField('Ad')).controller?.text, 'Ayşe');
    expect(tester.widget<TextFormField>(_labeledField('Yaş')).controller?.text, '28');
    expect(tester.widget<TextFormField>(_labeledField('Boy (cm)')).controller?.text, '170');
    expect(
      tester.widget<TextFormField>(_labeledField('Kilo (kg)')).controller?.text,
      '62,5',
    );
    expect(
      tester
          .widget<TextFormField>(
            find.widgetWithText(TextFormField, 'Örn. diz ağrısı, burpee yok'),
          )
          .controller
          ?.text,
      'diz ağrısı',
    );

    final mondayChip = tester.widget<FilterChip>(
      find.widgetWithText(FilterChip, 'Pazartesi'),
    );
    expect(mondayChip.selected, isTrue);
  });
}
