import Color from 'color';
import colors from './colors';
import { css } from 'styled-components';

export interface IBgsConfig {
  [name: string]: any;
}

export default {
  fade: () => css`
    color: ${colors.white};
    background-color: #3e3e3e;
    background: linear-gradient(to top right, #191919, #3e3e3e);
  `,
  fadeLight: () => css`
    color: ${colors.night};
    background-color: ${colors.white};
    background: linear-gradient(
      to top right,
      ${colors.offset},
      ${colors.white}
    );
  `,
  /**
   * Regular components used on most pages.
   */
  darker: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.white};
    background-color: ${colors.nightDarker};
    ${!borderless && `border: 1px solid ${colors.nightDark};`}
  `,
  dark: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.white};
    background-color: ${colors.night};
    ${!borderless && `border: 1px solid ${colors.nightDark};`}
  `,
  darkLight: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.white};
    background-color: ${colors.nightLight};
    ${!borderless && `border: 1px solid ${colors.nightDark};`}
  `,
  darkLighter: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.white};
    background-color: ${colors.nightLighter};
    ${!borderless && `border: 1px solid ${colors.nightDark};`}
  `,
  /**
   * Primary actions.
   */
  marine: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.marineLight};
    background-color: ${colors.marine};
    ${!borderless && `border: 1px solid ${colors.marineDark};`}
  `,
  marineLight: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.white};
    background-color: ${Color(colors.marine)
      .lighten(0.3)
      .string()};
    ${!borderless && `border: 1px solid ${colors.marineDark};`}
  `,
  marineEdges: () => css`
    border: 1px solid ${colors.marineLight};
  `,
  /**
   * Dangerous actions.
   */
  danger: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.danger};
    background-color: ${colors.dangerLight};
    ${!borderless && `border: 1px solid ${colors.dangerDark};`}
  `,
  dangerLight: ({ borderless }: IBgsConfig = {}) => css`
    color: ${colors.danger};
    background-color: ${Color(colors.dangerLight)
      .lighten(0.3)
      .string()};
    ${!borderless && `border: 1px solid ${colors.dangerDark};`}
  `,
};
