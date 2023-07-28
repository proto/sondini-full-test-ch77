moisture = 0

def on_forever():
    global moisture
    radio.set_group(1)
    moisture = pins.analog_read_pin(AnalogPin.P1)
    if (0) <= (400):
        radio.send_string("sete")
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    basic.pause(2000)
basic.forever(on_forever)
