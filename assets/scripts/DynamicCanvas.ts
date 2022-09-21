import { _decorator, Component, Node, screen, UITransform, ResolutionPolicy, view, Vec3, Enum, CCBoolean } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('DynamicCanvas')
@executeInEditMode(true)
export class DynamicCanvas extends Component {

    start() {
        globalThis.uiCanvas = this.node;
        globalThis.dynamicCanvasComp = this;
        globalThis.editorDeviceNo = 1;
        globalThis.rotateCanvas = true;
        // view.on('canvas-resize', () => {
        //     this.makeResponsive();
        // });
        // this.makeResponsive();
    }

    // makeResponsive() {
    //     let deviceResolution = screen.windowSize;

    //     const DESIGN_RESOLUTION_SIZE = view.getDesignResolutionSize();

    //     let desiredRatio = DESIGN_RESOLUTION_SIZE.width / DESIGN_RESOLUTION_SIZE.height;
    //     let deviceRatio = deviceResolution.width / deviceResolution.height;

    //     if (deviceRatio >= desiredRatio) {
    //         view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT)
    //     } else if (deviceRatio < desiredRatio) {
    //         view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH)
    //     }
    // }

    changeEditorDeviceType() {
        var deviceSize = this.changeDevice(globalThis.editorDeviceNo, globalThis.rotateCanvas);

        const screenSize = screen.windowSize;
        const viewScaleX = view.getScaleX();
        const viewScaleY = view.getScaleY();
        let w = (deviceSize && deviceSize.width) || screenSize.width / viewScaleX;
        let h = (deviceSize && deviceSize.height) || screenSize.height / viewScaleY;

        view.setDesignResolutionSize(w, h, view.getResolutionPolicy());
        //  view.resizeWithBrowserSize(true);
    }

    changeDevice(deviceType, orientation) {
        let width = 100;
        let height = 100;
        if (deviceType == 1) { //iphone7plus
            if (orientation) {
                width = 414;
                height = 736;
            } else {
                height = 414;
                width = 736;
            }
        } else if (deviceType == 2) { //iphoneX
            if (orientation) {
                width = 375;
                height = 812;
            } else {
                height = 375;
                width = 812;
            }
        } else if (deviceType == 3) { //ipad
            if (orientation) {
                width = 834;
                height = 1112;
            } else {
                height = 834;
                width = 1112;
            }
        }

        return { width, height }
    }

    update(deltaTime: number) {
        if (EDITOR) {
            this.changeEditorDeviceType();
        }
    }
}

