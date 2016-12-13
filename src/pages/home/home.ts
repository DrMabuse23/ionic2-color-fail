import {Platform} from 'ionic-angular/platform/platform';
import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {File} from 'ionic-native';

declare var cordova : any;

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  public messages : string[] = [];
  constructor(public platform: Platform, public navCtrl : NavController) {}

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        const fs: string = cordova.file.dataDirectory;
        File.createDir(fs, 'mydir', true)
          .then(() => {
            return File.checkDir(fs, 'mydir')
              .then(_ => this.messages.push('yay mydir'))
              .catch(err => {
                this.messages.push('boooh mydir')
                return err;
              });
          })
          .then((dirExist) => {
            this.messages.push('dirExist');
            return File.writeFile(`${fs}/mydir`, 'myFile.txt', 'Yay Now got to /src/theme/variabless.scss and try one or two color more', { append: true })
              .then(_ => this.messages.push('yay writeFile'))
              .catch(err => {
                this.messages.push('boooh writeFile')
                return err;
              });
          })
          .then(() => {
            return File.readAsText(`${fs}/mydir`, 'myFile.txt')
              .then(_ => {
                this.messages.push('yay readAsText')
                return _;
              })
              .catch(err => {
                this.messages.push('boooh readAsText')
                return err;
              });
          })
          .then((text: string) => {
            this.messages.push(text);
          })
          .catch((e) => {
            this.messages.push(JSON.stringify(e, null, 2));
          })
      } else {
        this.messages.push('Browser Dude');
      }
    });
  }

}
