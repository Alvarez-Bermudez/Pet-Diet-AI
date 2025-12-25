import { StyleSheet } from "react-native";

export const colors = {
  primary: "#ff6f61" /* Coral suave – amor y calidez */,
  secondary: "#ffd166" /* Amarillo pastel – energía y apetito */,
  accent: "#6c63ff" /* Azul violeta – tecnología/IA */,
  background: "#fff8f1" /* Fondo cálido, crema claro */,
  surface: "#ffffff" /* Tarjetas, contenedores */,
  textPrimary: "#333333" /* Texto fuerte */,
  textSecondary: "#7d7d7d" /* Texto suave */,
  textTertiary: "#C5C5C5",
  success: "#00c49a" /* Éxito o progreso (sin usar verde clásico) */,
  error: "#ef5350" /* Rojo coral – errores */,
};

export const stylesBase = StyleSheet.create({
  bodyBase: {
    //
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    fontWeight: "400",
    color: colors.textPrimary,
  },
  buttonText: {
    //
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    fontWeight: "500",
  },
  caption: {
    //
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    fontWeight: "400",
  },
  h1: {
    //
    fontFamily: "Poppins_500Medium",
    fontWeight: "500",
    fontSize: 32,
  },
  h2: {
    //
    fontFamily: "Poppins_500Medium",
    fontWeight: "500",
    fontSize: 24,
  },
  h3: {
    //
    fontFamily: "Poppins_500Medium",
    fontWeight: "500",
    fontSize: 20,
  },
  small: {
    //
    fontFamily: "Inter_400Regular",
    fontWeight: "400",
    fontSize: 14,
  },
});

export const styles = StyleSheet.create({
  layout: {
    position: "relative",
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 10,
    gap: 10,
    // marginHorizontal: "auto",
    alignItems: "center",
  },
  mainScrollViewContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
  mainScrollViewContentContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },

  tabBarLabelStyle: {
    color: colors.primary,
    padding: 5,
    fontFamily: "Nunito_700Bold",
    fontSize: 12,
    fontWeight: "700",
  },
  textInput: {
    borderWidth: 1,
    padding: 8,
  },
  textButton: {
    fontFamily: "Inter_500Medium",
    color: colors.surface,
    fontSize: 16,
    fontWeight: "500",
  },
});
