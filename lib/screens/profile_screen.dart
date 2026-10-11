import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../models/user_profile.dart';
import 'profile_validators.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _ageController = TextEditingController();
  final _heightController = TextEditingController();
  final _weightController = TextEditingController();
  final _restrictionsController = TextEditingController();

  FitnessGoal _goal = FitnessGoal.generalFitness;
  FitnessLevel _level = FitnessLevel.beginner;
  final Set<Weekday> _trainingDays = <Weekday>{};
  int _sessionMinutes = 30;
  EquipmentType _equipment = EquipmentType.none;
  AutovalidateMode _autovalidateMode = AutovalidateMode.disabled;

  static const _sessionOptions = [15, 30, 45, 60];

  @override
  void dispose() {
    _nameController.dispose();
    _ageController.dispose();
    _heightController.dispose();
    _weightController.dispose();
    _restrictionsController.dispose();
    super.dispose();
  }

  void _submit() {
    setState(() {
      _autovalidateMode = AutovalidateMode.onUserInteraction;
    });

    final form = _formKey.currentState;
    if (form == null || !form.validate()) {
      return;
    }

    final age = int.tryParse(_ageController.text.trim());
    final height = parseDecimalInput(_heightController.text);
    final weight = parseDecimalInput(_weightController.text);
    if (age == null || height == null || weight == null) {
      return;
    }

    final orderedDays = Weekday.values
        .where(_trainingDays.contains)
        .toList(growable: false);
    final restrictions = _restrictionsController.text.trim();
    final profile = UserProfile(
      name: _nameController.text.trim(),
      age: age,
      heightCm: height,
      weightKg: weight,
      goal: _goal,
      level: _level,
      trainingDays: orderedDays,
      sessionMinutes: _sessionMinutes,
      equipment: _equipment,
      restrictions: restrictions.isEmpty ? null : restrictions,
    );

    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => ProfileSummaryScreen(profile: profile),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
      ),
      resizeToAvoidBottomInset: true,
      body: SafeArea(
        child: Form(
          key: _formKey,
          autovalidateMode: _autovalidateMode,
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _SectionCard(
                  title: 'Kişisel bilgiler',
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _nameController,
                        textInputAction: TextInputAction.next,
                        textCapitalization: TextCapitalization.words,
                        decoration: const InputDecoration(
                          labelText: 'Ad',
                          hintText: 'Adın',
                          prefixIcon: Icon(Icons.person_outline),
                        ),
                        validator: validateProfileName,
                      ),
                      const SizedBox(height: 18),
                      TextFormField(
                        controller: _ageController,
                        keyboardType: TextInputType.number,
                        textInputAction: TextInputAction.next,
                        inputFormatters: [
                          FilteringTextInputFormatter.allow(RegExp(r'[0-9\-]')),
                        ],
                        decoration: const InputDecoration(
                          labelText: 'Yaş',
                          hintText: 'Örn. 28',
                          prefixIcon: Icon(Icons.cake_outlined),
                        ),
                        validator: validateProfileAge,
                      ),
                      const SizedBox(height: 18),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: TextFormField(
                              controller: _heightController,
                              keyboardType: const TextInputType.numberWithOptions(
                                decimal: true,
                                signed: true,
                              ),
                              textInputAction: TextInputAction.next,
                              inputFormatters: [
                                FilteringTextInputFormatter.allow(
                                  RegExp(r'[0-9\-.,]'),
                                ),
                              ],
                              decoration: const InputDecoration(
                                labelText: 'Boy (cm)',
                                hintText: 'Örn. 175',
                                prefixIcon: Icon(Icons.height),
                              ),
                              validator: validateProfileHeight,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextFormField(
                              controller: _weightController,
                              keyboardType: const TextInputType.numberWithOptions(
                                decimal: true,
                                signed: true,
                              ),
                              textInputAction: TextInputAction.done,
                              inputFormatters: [
                                FilteringTextInputFormatter.allow(
                                  RegExp(r'[0-9\-.,]'),
                                ),
                              ],
                              decoration: const InputDecoration(
                                labelText: 'Kilo (kg)',
                                hintText: 'Örn. 72.5',
                                prefixIcon: Icon(Icons.monitor_weight_outlined),
                              ),
                              validator: validateProfileWeight,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                _SectionCard(
                  title: 'Hedef',
                  child: _ChoiceWrap<FitnessGoal>(
                    values: FitnessGoal.values,
                    selected: _goal,
                    labelOf: (value) => value.label,
                    onSelected: (value) => setState(() => _goal = value),
                  ),
                ),
                const SizedBox(height: 20),
                _SectionCard(
                  title: 'Seviye',
                  child: _ChoiceWrap<FitnessLevel>(
                    values: FitnessLevel.values,
                    selected: _level,
                    labelOf: (value) => value.label,
                    onSelected: (value) => setState(() => _level = value),
                  ),
                ),
                const SizedBox(height: 20),
                _SectionCard(
                  title: 'Hangi günlerde antrenman yapabilirsin?',
                  child: FormField<Set<Weekday>>(
                    validator: validateTrainingDays,
                    builder: (field) {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Wrap(
                            spacing: 10,
                            runSpacing: 10,
                            children: [
                              for (final day in Weekday.values)
                                FilterChip(
                                  label: Text(day.label),
                                  selected: _trainingDays.contains(day),
                                  showCheckmark: true,
                                  selectedColor:
                                      Theme.of(context).colorScheme.primary,
                                  checkmarkColor: Colors.white,
                                  backgroundColor: Colors.white,
                                  labelStyle: TextStyle(
                                    color: _trainingDays.contains(day)
                                        ? Colors.white
                                        : const Color(0xFF1B2430),
                                    fontWeight: FontWeight.w700,
                                  ),
                                  side: BorderSide(
                                    color: _trainingDays.contains(day)
                                        ? Theme.of(context).colorScheme.primary
                                        : const Color(0xFFD7DEE6),
                                  ),
                                  onSelected: (selected) {
                                    setState(() {
                                      if (selected) {
                                        _trainingDays.add(day);
                                      } else {
                                        _trainingDays.remove(day);
                                      }
                                    });
                                    field.didChange(
                                      Set<Weekday>.from(_trainingDays),
                                    );
                                  },
                                ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            _trainingDays.isEmpty
                                ? 'Henüz gün seçilmedi.'
                                : 'Haftada ${_trainingDays.length} gün',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  color: const Color(0xFF5B6775),
                                  fontWeight: FontWeight.w600,
                                ),
                          ),
                          if (field.hasError) ...[
                            const SizedBox(height: 8),
                            Text(
                              field.errorText!,
                              style: TextStyle(
                                color: Theme.of(context).colorScheme.error,
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ],
                      );
                    },
                  ),
                ),
                const SizedBox(height: 20),
                _SectionCard(
                  title: 'Antrenman süresi',
                  child: _ChoiceWrap<int>(
                    values: _sessionOptions,
                    selected: _sessionMinutes,
                    labelOf: (value) => '$value dk',
                    onSelected: (value) => setState(() => _sessionMinutes = value),
                  ),
                ),
                const SizedBox(height: 20),
                _SectionCard(
                  title: 'Ekipman',
                  child: _ChoiceWrap<EquipmentType>(
                    values: EquipmentType.values,
                    selected: _equipment,
                    labelOf: (value) => value.label,
                    onSelected: (value) => setState(() => _equipment = value),
                  ),
                ),
                const SizedBox(height: 20),
                _SectionCard(
                  title: 'Kısıt veya kaçınılacak hareket (isteğe bağlı)',
                  child: TextFormField(
                    controller: _restrictionsController,
                    minLines: 3,
                    maxLines: 5,
                    textInputAction: TextInputAction.done,
                    decoration: const InputDecoration(
                      hintText: 'Örn. diz ağrısı, burpee yok',
                      alignLabelWithHint: true,
                      prefixIcon: Icon(Icons.notes_outlined),
                    ),
                  ),
                ),
                const SizedBox(height: 28),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton(
                    onPressed: _submit,
                    child: const Text('Devam Et'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ProfileSummaryScreen extends StatelessWidget {
  const ProfileSummaryScreen({super.key, required this.profile});

  final UserProfile profile;

  String _formatNumber(double value) {
    return value == value.roundToDouble()
        ? value.toInt().toString()
        : value.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil özeti'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(18, 20, 18, 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _SummaryRow(label: 'Ad', value: profile.name),
                    _SummaryRow(label: 'Yaş', value: '${profile.age}'),
                    _SummaryRow(
                      label: 'Boy',
                      value: '${_formatNumber(profile.heightCm)} cm',
                    ),
                    _SummaryRow(
                      label: 'Kilo',
                      value: '${_formatNumber(profile.weightKg)} kg',
                    ),
                    _SummaryRow(label: 'Hedef', value: profile.goal.label),
                    _SummaryRow(label: 'Seviye', value: profile.level.label),
                    _SummaryRow(
                      label: 'Antrenman günleri',
                      value: profile.trainingDaysSummary,
                    ),
                    _SummaryRow(
                      label: 'Haftalık gün',
                      value: '${profile.weeklyTrainingDays} gün',
                    ),
                    _SummaryRow(
                      label: 'Süre',
                      value: '${profile.sessionMinutes} dakika',
                    ),
                    _SummaryRow(label: 'Ekipman', value: profile.equipment.label),
                    _SummaryRow(
                      label: 'Kısıt / not',
                      value: profile.restrictions ?? 'Belirtilmedi',
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  const _SectionCard({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(18, 20, 18, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w800,
                    color: const Color(0xFF1B2430),
                    height: 1.35,
                  ),
            ),
            const SizedBox(height: 16),
            child,
          ],
        ),
      ),
    );
  }
}

class _ChoiceWrap<T> extends StatelessWidget {
  const _ChoiceWrap({
    required this.values,
    required this.selected,
    required this.labelOf,
    required this.onSelected,
  });

  final List<T> values;
  final T selected;
  final String Function(T value) labelOf;
  final ValueChanged<T> onSelected;

  @override
  Widget build(BuildContext context) {
    final primary = Theme.of(context).colorScheme.primary;
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        for (final value in values)
          ChoiceChip(
            label: Text(labelOf(value)),
            selected: value == selected,
            selectedColor: primary,
            backgroundColor: Colors.white,
            labelStyle: TextStyle(
              color: value == selected ? Colors.white : const Color(0xFF1B2430),
              fontWeight: FontWeight.w700,
            ),
            side: BorderSide(
              color: value == selected ? primary : const Color(0xFFD7DEE6),
            ),
            onSelected: (_) => onSelected(value),
          ),
      ],
    );
  }
}

class _SummaryRow extends StatelessWidget {
  const _SummaryRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
                  color: Theme.of(context).colorScheme.primary,
                  fontWeight: FontWeight.w700,
                ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: const Color(0xFF1B2430),
                ),
          ),
        ],
      ),
    );
  }
}
