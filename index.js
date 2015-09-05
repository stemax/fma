/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//"use strict";
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require("sdk/self").data;

var button = ToggleButton({
    id: "my-button",
    label: "SMT Info",
    icon: {
        "16": "./icon-info-16.png",
        "32": "./icon-info-32.png",
        "64": "./icon-info-64.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    contentURL: self.data.url("panel.html"),
    onHide: handleHide,
    contentScriptFile: [data.url("jquery.js"), data.url("my-content-script.js")],
    width: 310,
    height: 120
});


function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}