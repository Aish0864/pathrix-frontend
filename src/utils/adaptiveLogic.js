export function determineNextAction(masteryPct, score, total, cognitiveLoad) {
  if (masteryPct >= 65 && score >= 2) return "advance";
  if (masteryPct >= 45 && score >= 2) return "stay_harder";
  return "retry_easier";
}
