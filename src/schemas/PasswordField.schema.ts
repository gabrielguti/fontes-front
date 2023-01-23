import { IconDefinition } from "@fortawesome/fontawesome-svg-core"


export type PasswordInputUi =
    | {
          type: "password"
          icon: IconDefinition
          tooltipTitle: "Mostrar"
      }
    | {
          type: "text"
          icon: IconDefinition
          tooltipTitle: "Ocultar"
      }
