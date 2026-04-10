                const RULES = [
                  { label: 'bug', test: /(bug|broken|fails?|error|crash|regression)/i },
                  { label: 'feature', test: /(feature|enhancement|idea|request)/i },
                  { label: 'docs', test: /(docs?|readme|documentation)/i },
                  { label: 'security', test: /(security|auth|oauth|token|credential|leak)/i },
                  { label: 'performance', test: /(slow|performance|latency|memory)/i },
                ];

                export function suggestLabels({ title = '', body = '' } = {}) {
                  const text = `${title}
${body}`;
                  return RULES.filter((rule) => rule.test.test(text)).map((rule) => rule.label);
                }

                export function priorityScore({ title = '', body = '' } = {}) {
                  const text = `${title}
${body}`;
                  let score = 0;
                  if (/(security|data loss|production|urgent|sev1|critical)/i.test(text)) score += 8;
                  if (/(bug|broken|crash|regression)/i.test(text)) score += 4;
                  if (/(docs|feature|enhancement)/i.test(text)) score += 1;
                  return score;
                }

                export function triage(issue) {
                  return {
                    labels: suggestLabels(issue),
                    priority: priorityScore(issue),
                    route: /security/i.test(`${issue?.title || ''} ${issue?.body || ''}`) ? 'security-review' : 'general-queue',
                  };
                }

                if (import.meta.url === `file://${process.argv[1]}`) {
                  console.log(triage({ title: 'bug: oauth token refresh fails', body: 'critical error in production login flow' }));
                }
