export function suggestLabels(title = '', body = '') {
  const text = `${title} ${body}`.toLowerCase();
  return ['bug', 'feature', 'docs', 'help wanted'].filter((label) => text.includes(label.split(' ')[0]));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(suggestLabels('bug: login page fails', 'help wanted on docs and auth flow'));
}
