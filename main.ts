datalogger.onLogFull(function () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    basic.showString("H2O" + moisture)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("RESET!")
    datalogger.deleteLog(datalogger.DeleteType.Full)
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    basic.showString("Lum" + input.lightLevel())
    basic.showString("Temp" + input.temperature())
    basic.clearScreen()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString(control.deviceName())
    basic.clearScreen()
})
let moisture = 0
radio.setGroup(77)
radio.setTransmitSerialNumber(true)
led.setBrightness(30)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
datalogger.setColumnTitles(
"temp",
"lum",
"h2o"
)
basic.forever(function () {
    moisture = pins.analogReadPin(AnalogPin.P1)
    if (true) {
        radio.sendValue(control.deviceName(), input.temperature())
        radio.sendValue(control.deviceName(), input.lightLevel())
    }
    if (moisture <= 400) {
        radio.sendValue(control.deviceName(), moisture)
        basic.showIcon(IconNames.Sad)
        basic.pause(500)
        basic.clearScreen()
        music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
    } else {
        radio.sendValue(control.deviceName(), moisture)
    }
    datalogger.log(
    datalogger.createCV("temp", input.temperature()),
    datalogger.createCV("lum", input.lightLevel()),
    datalogger.createCV("h2o", moisture)
    )
    basic.pause(60000)
})
