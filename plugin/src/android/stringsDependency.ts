import { AndroidConfig, ConfigPlugin, withStringsXml } from 'expo/config-plugins'
import { ResourceXML } from '@expo/config-plugins/build/android/Resources'

import { PluginConfigType } from '../pluginConfig'

/**
 * Update `<project>/app/src/main/res/values/strings.xml` by adding react-native-code-push deployment key
 */

function setStrings(strings: ResourceXML, name: string, value: string) {
  // Helper to add string.xml JSON items or overwrite existing items with the same name.
  return AndroidConfig.Strings.setStringItem(
    [
      // XML represented as JSON
      // <string moduleConfig="true" name="">value</string>
      { $: { name }, _: value },
    ],
    strings
  )
}

export const withAndroidStringsDependency: ConfigPlugin<PluginConfigType> = (config, props) => {
  return withStringsXml(config, (config) => {
    config.modResults = setStrings(config.modResults, 'CodePushDeploymentKey', props.android.CodePushDeploymentKey)
    if (props.android.CodePushPublicKey) config.modResults = setStrings(config.modResults, 'CodePushPublicKey', props.android.CodePushPublicKey)
    return config
  })
}
