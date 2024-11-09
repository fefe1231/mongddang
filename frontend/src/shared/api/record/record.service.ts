export class RecordServcie {
  public readonly queryKeys = {
    all: ['bloodSugar'] as const,
    lists: () => [...this.queryKeys.all, 'list'] as const,
    filtered: (filters: BloodSugarFilters) => 
      [...this.queryKeys.lists(), { filters }] as const,
  };
  static glucoseQuery() {}
}
