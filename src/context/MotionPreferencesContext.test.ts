import { getMotionTier } from './MotionPreferencesContext';

test('reduces motion when data saving, offline mode, or a 2G connection is detected', () => {
  expect(getMotionTier({ effectiveType: '4g', saveData: true }, true)).toBe('minimal');
  expect(getMotionTier({ effectiveType: '2g' }, true)).toBe('minimal');
  expect(getMotionTier({ effectiveType: '4g' }, false)).toBe('minimal');
});

test('uses balanced motion for a 3G or slow connection', () => {
  expect(getMotionTier({ effectiveType: '3g' }, true)).toBe('balanced');
  expect(getMotionTier({ downlink: 1.2 }, true)).toBe('balanced');
});

test('keeps full motion for a fast or unreported connection', () => {
  expect(getMotionTier({ effectiveType: '4g', downlink: 10 }, true)).toBe('full');
  expect(getMotionTier(null, true)).toBe('full');
});
