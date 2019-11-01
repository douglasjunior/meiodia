#!/usr/bin/env node
const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const meiodiaPath = path.join(mainPath, './meiodia');

const meiodia = function (){
    const linuxcmd = R.join('', ['paplay ', meiodiaPath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', meiodiaPath, '.mp3']);
    const maccmd = R.join('', ['afplay ', meiodiaPath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd){
        return exect(cmd, function (error) {
            R.ifElse(
               R.empty,
               () => console.log('🕺🍻 Chaaaaaaaama!'),
               (error) => console.error(error),
               error)
        });
    }
}

module.exports = meiodia;

if (!module.parent) {
    meiodia();
}
