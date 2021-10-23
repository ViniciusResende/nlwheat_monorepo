import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK_TERTIARY,
    width: '100%',
    height: 184,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace() + 16,
    paddingTop: 16,
  },
  input: {
    width: '100%',
    height: 88,
    textAlignVertical: 'top',
    color: COLORS.WHITE,
  },
});
