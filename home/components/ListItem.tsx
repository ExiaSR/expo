import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
  Text,
  ViewStyle,
  Image,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';

import Colors from '../constants/Colors';
import { Ionicons } from './Icons';
import PlatformIcon from './PlatformIcon';
import { StyledText } from './Text';
import { StyledButton, StyledView } from './Views';

type IconProps = React.ComponentProps<typeof Ionicons>;
type PlatformIconProps = React.ComponentProps<typeof PlatformIcon>;

type Props = {
  style?: ViewStyle;
  onPress?: () => any;
  onLongPress?: () => any;
  title?: string;
  subtitle?: string;
  onPressSubtitle?: () => any;
  renderSDKInfo?: () => any;
  last?: boolean;
  margins?: boolean;
  icon?: IconProps['name'];
  iconStyle?: IconProps['style'];
  image?: number | string | null;
  imageStyle?: ViewStyle;
  checked?: boolean;
  arrowForward?: boolean;
  rightContent?: React.ReactNode;
  platform?: PlatformIconProps['platform'];
};

export default class ListItem extends React.PureComponent<Props> {
  render() {
    const {
      onPress,
      onLongPress,
      renderSDKInfo,
      style,
      last,
      margins,
      title,
      subtitle,
    } = this.props;
    return (
      <View style={last && margins !== false ? styles.marginBottomLast : undefined}>
        <StyledButton
          onPress={onPress}
          onLongPress={onLongPress}
          fallback={TouchableHighlight}
          underlayColor="#b7b7b7"
          style={[styles.container, last && styles.containerLast, style]}>
          {this.renderImage()}
          <StyledView style={[styles.contentContainer, !last && styles.contentContainerNotLast]}>
            <View
              style={[
                styles.textContainer,
                title && subtitle ? styles.textContainerBoth : undefined,
              ]}>
              {this.renderTitle()}
              {this.renderSubtitle()}
              {renderSDKInfo?.()}
            </View>
            {this.renderRightContent()}
            {this.renderCheck()}
            {this.renderArrowForward()}
          </StyledView>
        </StyledButton>
      </View>
    );
  }

  private renderImage() {
    const { icon, iconStyle, image, imageStyle } = this.props;
    if (image !== undefined) {
      if (image === null) {
        return <View style={[styles.image, styles.emptyImage]} />;
      } else {
        const source = typeof image === 'number' ? image : { uri: image };
        return (
          <View style={[styles.imageContainer, imageStyle]}>
            <FadeIn placeholderColor="#eee">
              <Image source={source} style={styles.image} />
            </FadeIn>
          </View>
        );
      }
    } else if (icon) {
      return (
        <View style={styles.iconContainer}>
          <Ionicons
            style={[styles.icon, iconStyle]}
            name={icon}
            lightColor={Colors.light.text}
            darkColor="#fff"
          />
        </View>
      );
    } else {
      return undefined;
    }
  }

  private renderTitle() {
    const { title, platform } = this.props;

    return title ? (
      <View style={styles.titleContainer}>
        {platform && <PlatformIcon platform={platform} />}
        <StyledText style={styles.titleText} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </StyledText>
      </View>
    ) : (
      undefined
    );
  }

  private renderSubtitle() {
    const { title, subtitle, icon, image, onPressSubtitle } = this.props;
    const isCentered = !title && !icon && !image;
    return subtitle ? (
      <Text
        style={[
          styles.subtitleText,
          !title ? styles.subtitleMarginBottom : undefined,
          isCentered ? styles.subtitleCentered : undefined,
        ]}
        onPress={onPressSubtitle}
        ellipsizeMode="tail"
        numberOfLines={title ? 1 : 2}>
        {subtitle}
      </Text>
    ) : (
      undefined
    );
  }

  private renderCheck() {
    const { checked } = this.props;
    if (!checked) return;
    return (
      <View style={styles.checkContainer}>
        <Ionicons name="ios-checkmark" size={35} color={Colors.light.tintColor} />
      </View>
    );
  }

  private renderArrowForward() {
    const { arrowForward } = this.props;
    if (!arrowForward) return;
    return (
      <View style={styles.arrowForwardContainer}>
        <Ionicons name="ios-arrow-forward" size={22} color={Colors.light.greyText} />
      </View>
    );
  }

  private renderRightContent() {
    const { rightContent } = this.props;
    if (!rightContent) return;
    return rightContent;
  }
}

const ImageWidth = 54;
const ImageHeight = ImageWidth;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 44,
    paddingStart: 15,
  },
  containerLast: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 3,
    marginEnd: 10,
  },
  image: {
    width: ImageWidth,
    height: ImageHeight,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  emptyImage: {
    backgroundColor: '#eee',
  },
  iconContainer: {
    alignSelf: 'center',
    width: ImageWidth,
    height: ImageHeight,
    marginEnd: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
  },
  contentContainerNotLast: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textContainerBoth: {
    paddingTop: 13,
    paddingBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleText: {
    flex: 1,
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '400',
        marginTop: 1,
      },
    }),
  },
  subtitleText: {
    color: Colors.light.greyText,
    fontSize: 13,
  },
  subtitleMarginBottom: {
    marginBottom: 2,
  },
  subtitleCentered: {
    textAlign: 'center',
    marginEnd: 10,
  },
  marginBottomLast: {
    marginBottom: 12,
  },
  checkContainer: {
    marginStart: 5,
    marginEnd: 10,
  },
  arrowForwardContainer: {
    marginStart: 5,
    marginEnd: 10,
  },
});
