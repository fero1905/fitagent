enum FitnessGoal {
  weightLoss,
  muscleGain,
  generalFitness,
}

enum FitnessLevel {
  beginner,
  intermediate,
  advanced,
}

enum EquipmentType {
  none,
  dumbbell,
  resistanceBand,
  gym,
}

enum Weekday {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

extension FitnessGoalLabel on FitnessGoal {
  String get label {
    switch (this) {
      case FitnessGoal.weightLoss:
        return 'Kilo verme';
      case FitnessGoal.muscleGain:
        return 'Kas geliştirme';
      case FitnessGoal.generalFitness:
        return 'Genel kondisyon';
    }
  }
}

extension FitnessLevelLabel on FitnessLevel {
  String get label {
    switch (this) {
      case FitnessLevel.beginner:
        return 'Başlangıç';
      case FitnessLevel.intermediate:
        return 'Orta';
      case FitnessLevel.advanced:
        return 'İleri';
    }
  }
}

extension EquipmentTypeLabel on EquipmentType {
  String get label {
    switch (this) {
      case EquipmentType.none:
        return 'Ekipmansız';
      case EquipmentType.dumbbell:
        return 'Dambıl';
      case EquipmentType.resistanceBand:
        return 'Direnç bandı';
      case EquipmentType.gym:
        return 'Spor salonu';
    }
  }
}

extension WeekdayLabel on Weekday {
  String get label {
    switch (this) {
      case Weekday.monday:
        return 'Pazartesi';
      case Weekday.tuesday:
        return 'Salı';
      case Weekday.wednesday:
        return 'Çarşamba';
      case Weekday.thursday:
        return 'Perşembe';
      case Weekday.friday:
        return 'Cuma';
      case Weekday.saturday:
        return 'Cumartesi';
      case Weekday.sunday:
        return 'Pazar';
    }
  }
}

class UserProfile {
  const UserProfile({
    required this.name,
    required this.age,
    required this.heightCm,
    required this.weightKg,
    required this.goal,
    required this.level,
    required this.trainingDays,
    required this.sessionMinutes,
    required this.equipment,
    this.restrictions,
  });

  final String name;
  final int age;
  final double heightCm;
  final double weightKg;
  final FitnessGoal goal;
  final FitnessLevel level;
  final List<Weekday> trainingDays;
  final int sessionMinutes;
  final EquipmentType equipment;
  final String? restrictions;

  int get weeklyTrainingDays => trainingDays.length;

  String get trainingDaysSummary {
    if (trainingDays.isEmpty) {
      return 'Seçilmedi';
    }
    return trainingDays.map((day) => day.label).join(', ');
  }
}
