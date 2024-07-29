import {  View, ImageBackground } from "react-native";
import { s } from "./App.style";
import hotBackground from "./assets/images/hot.png";
import coldBackground from "./assets/images/cold.png";
import { useState, useEffect } from "react";
import { InputTemperature } from "./components/InputTemperature/InputTemperature";
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";
import { DEFAULT_TEMPERATURE, DEFAULT_UNIT, UNITS } from "./constants/constant";
import {
  getOppositUnit,
  convertTemperatureTo,
  isIceTemperature
} from "./services/temperature-service";

export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
  const oppositeUnit = getOppositUnit(currentUnit);
  const [currentBackground, setCurrentBackground] = useState();

  useEffect(() => {
    return () => {
      const temperatureAsFloat = Number.parseFloat(inputValue);
      if (!isNaN(temperatureAsFloat)) {
        const iscColdBackground = isIceTemperature(inputValue, currentUnit);
        setCurrentBackground(
          iscColdBackground ? coldBackground : hotBackground
        );
      }
    };
  }, [inputValue]);

  function getConvertedTemperature() {
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat)
      ? ""
      : convertTemperatureTo(oppositeUnit, valueAsFloat).toFixed(1);
  }

  return (
    <ImageBackground source={hotBackground} style={s.container}>
      <View style={s.workspace}>
        <TemperatureDisplay
          value={getConvertedTemperature()}
          unit={oppositeUnit}
        />
        <InputTemperature
          onChangeText={setInputValue}
          defaultValue={DEFAULT_TEMPERATURE}
        />
        <View>
          <ButtonConvert
            onPress={() => {
              setCurrentUnit(oppositeUnit);
            }}
            unit={currentUnit}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
