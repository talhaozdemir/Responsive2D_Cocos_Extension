'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
//type Object<propList> = { propList: Record<keyof propList, any | null> };
exports.template = `
<style>
    .tab {
        margin-top: 5px;
        overflow: hidden;
        border: 1px solid #0C0C0C;
        background-color: #141414;
        padding: 2px;
    }

    .tab ui-button.active {
        background-color: #141414;
    }

    .tabcontent {
        display: none;
        padding: 6px 12px;
        border: 1px dashed #0C0C0C;
        border-top: none;
        background-color: #292929;
        color: white;
        height: 450px;
    }

    .scale-components {
        width: 100%;
        background-color: blue;
        margin-bottom: 10px;
    }

    .scale-input {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 10px;
        background-color: #292929;
    }

    .slider-label-narrow {
        width: 80px;
    }
    
    .slider-label-wide {
        width: 120px;
    }

    .cocos-slider {
        width: 100%;
    }

    .cocos-slider-2 {
        width: 60%;
    }

    .widget-wrapper{
        display: grid;
        background-color: #292929;
        width: 100%;
        height: 200px;
        margin: 0 auto;
        grid-template-rows: 1fr 3fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "empty topNode empty"
            "leftNode widget rightNode"
            "empty bottomNode empty";
        align-items: center;
        justify-items: center;
        align-content: center;
        column-gap: 10px;
        row-gap: 10px;
    }

    .empty-area{
        grid-area: "empty";
    }

    .top-node{
        grid-area: "topNode";
    }

    .left-node{
        grid-area: "leftNode";
    }

    .right-node{
        grid-area: "rightNode";
    }

    .bottom-node{
        grid-area: "bottomNode";
    }

    .ref-node {
        min-width: 60px;
        width: 2fr;
    }

    .space-input {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 10px;
        background-color: #292929;    
    }

    .widget {
        display: grid;
        background-color: #292929;
        width: 108px;
        height: 108px;
        margin: 0 auto;
        margin-bottom: 10px;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
            "rect rect rect"
            "rect rect rect"
            "rect rect rect";
        align-items: center;
        justify-items: center;
        grid-area: "widget";
    }

    .inner-widget {
        background-color: #303C4A;
        width: 32px;
        height: 34px;
        text-align: center;
        grid-area: "rect";
        justify-content: center;
    }

    .logo {
        float: right;
        margin-right: 5px;
        margin-top: 6px;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .disable {
        pointer-events: none;
        opacity: 0.4;
    }
</style>

<div class="tab">
    <ui-button id="PortraitButton"><ui-icon value="mobile"></ui-icon></ui-button>
    <ui-button id="LandscapeButton" style="margin-left: 2px;"><ui-icon style="transform: rotate(90deg);" value="mobile"></ui-icon></ui-button>
    <ui-button id="SettingsButton" style="margin-left: 2px;"><ui-icon value="setting"></ui-icon></ui-button>
    <ui-button id="change-editor-device" class="yellow" style="margin-left: 2px; float: right;"><ui-icon value="transform"></ui-icon></ui-button>
    <ui-button id="rotate-canvas" class="blue" style="margin-left: 2px; margin-right: 2px; float: right;"><ui-icon value="rotate"></ui-icon></ui-button>
   
    <ui-button id="rotate-canvas-portrait" class="blue" style="display: none;"><ui-icon value="rotate"></ui-icon></ui-button>
    <ui-button id="rotate-canvas-landscape" class="blue" style="display: none;"><ui-icon value="rotate"></ui-icon></ui-button>
</div>

<div id="Portrait" class="tabcontent">
    <ui-input id="portrait-alignment" style="display:none;" value="portrait-mid-center"></ui-input>
    <div class="scale-components">
        <div class="scale-input">
            <label class="slider-label-narrow">W Ratio</label>
            <ui-slider class="cocos-slider" id="portrait-width-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <div class="scale-input">
            <label class="slider-label-narrow">H Ratio</label>
            <ui-slider class="cocos-slider" id="portrait-height-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <ui-select id="portrait-min-max" value="1" style="float:right;">
            <option value="1">min</option>
            <option value="2">max</option>
            <option value="3">stretch</option>
        </ui-select>
    </div>
    <div class="widget-wrapper">
        <div class="empty-area"></div>
        <div class="top-node">
            <ui-node droppable="cc.Node" id="portrait-top-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="left-node">
            <ui-node droppable="cc.Node" id="portrait-left-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="widget">
            <ui-button class="inner-widget" id="portrait-top-left"></ui-button>
            <ui-button class="inner-widget" id="portrait-top-center"></ui-button>
            <ui-button class="inner-widget" id="portrait-top-right"></ui-button>

            <ui-button class="inner-widget" id="portrait-mid-left"></ui-button>
            <ui-button style="background-color: #F58D1E;" class="inner-widget" id="portrait-mid-center"></ui-button>
            <ui-button class="inner-widget" id="portrait-mid-right"></ui-button>

            <ui-button class="inner-widget" id="portrait-bottom-left"></ui-button>
            <ui-button class="inner-widget" id="portrait-bottom-center"></ui-button>
            <ui-button class="inner-widget" id="portrait-bottom-right"></ui-button>
        </div>
        <div class="right-node">
            <ui-node droppable="cc.Node" id="portrait-right-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="bottom-node">
            <ui-node droppable="cc.Node" id="portrait-bottom-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
    </div>
    <div class="space-input" style="margin-top: 10px;">
        <label class="slider-label-narrow">Hor Space</label>
        <ui-slider class="cocos-slider-2" id="portrait-hor-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="portrait-hor-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
        </ui-select>
    </div>
    <div class="space-input">
        <label class="slider-label-narrow">Ver Space</label>
        <ui-slider class="cocos-slider-2" id="portrait-ver-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="portrait-ver-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
        </ui-select>
    </div>
    <ui-checkbox style="display: block;" value="false" id="enable-portrait-flip-x">Flip X</ui-checkbox>
    <ui-checkbox style="display: block;" value="false" id="enable-portrait-flip-y">Flip Y</ui-checkbox>
</div>

<div id="Landscape" class="tabcontent">
    <ui-input id="landscape-alignment" style="display:none;" value="landscape-mid-center"></ui-input>
    <ui-checkbox value="false" id="enable-landscape">Enable</ui-checkbox>
    <div id="disabled_content" class="disable">
    <div class="scale-components">
        <div class="scale-input">
            <label class="slider-label-narrow">W Ratio</label>
            <ui-slider class="cocos-slider" id="landscape-width-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <div class="scale-input">
            <label class="slider-label-narrow">H Ratio</label>
            <ui-slider class="cocos-slider" id="landscape-height-ratio" step="0.01" value="0.25" min="0.01" max="5"></ui-slider>
        </div>
        <ui-select id="landscape-min-max" value="1" style="float: right">
            <option value="1">min</option>
            <option value="2">max</option>
            <option value="3">stretch</option>
        </ui-select>
    </div>
    <div class="widget-wrapper">
        <div class="empty-area"></div>
        <div class="top-node">
            <ui-node droppable="cc.Node" id="landscape-top-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="left-node">
            <ui-node droppable="cc.Node" id="landscape-left-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="widget">
            <ui-button class="inner-widget" id="landscape-top-left"></ui-button>
            <ui-button class="inner-widget" id="landscape-top-center"></ui-button>
            <ui-button class="inner-widget" id="landscape-top-right"></ui-button>

            <ui-button class="inner-widget" id="landscape-mid-left"></ui-button>
            <ui-button style="background-color: #F58D1E;" class="inner-widget" id="landscape-mid-center"></ui-button>
            <ui-button class="inner-widget" id="landscape-mid-right"></ui-button>

            <ui-button class="inner-widget" id="landscape-bottom-left"></ui-button>
            <ui-button class="inner-widget" id="landscape-bottom-center"></ui-button>
            <ui-button class="inner-widget" id="landscape-bottom-right"></ui-button>
        </div>
        <div class="right-node">
            <ui-node droppable="cc.Node" id="landscape-right-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
        <div class="bottom-node">
            <ui-node droppable="cc.Node" id="landscape-bottom-node-uuid" class="ref-node"></ui-node>
        </div>
        <div class="empty-area"></div>
    </div>
    <div class="space-input" style="margin-top: 10px;">
        <label class="slider-label-narrow">Hor Space</label>
        <ui-slider class="cocos-slider-2" id="landscape-hor-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="landscape-hor-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
        </ui-select>
    </div>
    <div class="space-input">
        <label class="slider-label-narrow">Ver Space</label>
        <ui-slider class="cocos-slider-2" id="landscape-ver-space" step="0.5" value="0" min="-100" max="100"></ui-slider>
        <ui-select id="landscape-ver-space-type" value="1">
            <option value="1">%</option>
            <option value="2">px</option>
            <option value="3">self</option>
            <option value="4">left</option>
            <option value="5">right</option>
            <option value="6">top</option>
            <option value="7">bottom</option>
        </ui-select>
    </div>
    <ui-checkbox style="display: block;" value="false" id="enable-landscape-flip-x">Flip X</ui-checkbox>
    <ui-checkbox style="display: block;" value="false" id="enable-landscape-flip-y">Flip Y</ui-checkbox>
    </div>
</div>

<div id="Settings" class="tabcontent">
    <div style="margin-bottom: 10px; margin-top: 10px; display: flex; align-content: center;">
        <label class="slider-label-wide" style="padding-right: 10px">Resize Frequency</label>
        <ui-select id="align-mode" value="1">
            <option value="1">ONCE</option>
            <option value="2">ALWAYS</option>
            <option value="3">ON_WINDOW_RESIZE</option>
        </ui-select>
    </div>
    <div style="margin-bottom: 10px">
        <ui-checkbox value="false" id="is-calculating-container-bounds">Calculate Content Size</ui-checkbox>
    </div>
    <div style="margin-bottom: 10px"><ui-checkbox value="false" id="is-positioning-from-anchor-point">Positioning from Anchor</ui-checkbox></div>
</div>
`;
/* <ui-button id="recalculate-content-size" class="blue" style="margin-left: 10px;">Recalculate</ui-button> */
exports.$ = {
    portraitButton: '#PortraitButton',
    landscapeButton: '#LandscapeButton',
    settingsButton: '#SettingsButton',
    portrait: '#Portrait',
    landscape: '#Landscape',
    settings: '#Settings',
    portraitAlignment: '#portrait-alignment',
    portraitWidthRatio: '#portrait-width-ratio',
    portraitHeightRatio: '#portrait-height-ratio',
    portraitHorSpace: '#portrait-hor-space',
    portraitVerSpace: '#portrait-ver-space',
    portraitTopLeft: '#portrait-top-left',
    portraitTopCenter: '#portrait-top-center',
    portraitTopRight: '#portrait-top-right',
    portraitMidLeft: '#portrait-mid-left',
    portraitMidCenter: '#portrait-mid-center',
    portraitMidRight: '#portrait-mid-right',
    portraitBottomLeft: '#portrait-bottom-left',
    portraitBottomCenter: '#portrait-bottom-center',
    portraitBottomRight: '#portrait-bottom-right',
    portraitTopNodeUUID: '#portrait-top-node-uuid',
    portraitBottomNodeUUID: '#portrait-bottom-node-uuid',
    portraitLeftNodeUUID: '#portrait-left-node-uuid',
    portraitRightNodeUUID: '#portrait-right-node-uuid',
    portraitMinMax: '#portrait-min-max',
    portraitVerSpaceType: '#portrait-ver-space-type',
    portraitHorSpaceType: '#portrait-hor-space-type',
    portraitFlipX: '#enable-portrait-flip-x',
    portraitFlipY: '#enable-portrait-flip-y',
    enableLandscape: '#enable-landscape',
    landscapeAlignment: '#landscape-alignment',
    landscapeWidthRatio: '#landscape-width-ratio',
    landscapeHeightRatio: '#landscape-height-ratio',
    landscapeHorSpace: '#landscape-hor-space',
    landscapeVerSpace: '#landscape-ver-space',
    landscapeTopLeft: '#landscape-top-left',
    landscapeTopCenter: '#landscape-top-center',
    landscapeTopRight: '#landscape-top-right',
    landscapeMidLeft: '#landscape-mid-left',
    landscapeMidCenter: '#landscape-mid-center',
    landscapeMidRight: '#landscape-mid-right',
    landscapeBottomLeft: '#landscape-bottom-left',
    landscapeBottomCenter: '#landscape-bottom-center',
    landscapeBottomRight: '#landscape-bottom-right',
    landscapeTopNodeUUID: '#landscape-top-node-uuid',
    landscapeBottomNodeUUID: '#landscape-bottom-node-uuid',
    landscapeLeftNodeUUID: '#landscape-left-node-uuid',
    landscapeRightNodeUUID: '#landscape-right-node-uuid',
    landscapeMinMax: '#landscape-min-max',
    landscapeVerSpaceType: '#landscape-ver-space-type',
    landscapeHorSpaceType: '#landscape-hor-space-type',
    landscapeFlipX: '#enable-landscape-flip-x',
    landscapeFlipY: '#enable-landscape-flip-y',
    alignMode: '#align-mode',
    isCalculatingContainerBounds: '#is-calculating-container-bounds',
    isPositioningFromAnchorPoint: '#is-positioning-from-anchor-point',
    rotateCanvas: '#rotate-canvas',
    rotateCanvasPortrait: '#rotate-canvas-portrait',
    rotateCanvasLandscape: '#rotate-canvas-landscape',
    changeEditorDevice: '#change-editor-device',
    disabledContent: '#disabled_content'
    //oneTimeExecution: '#recalculate-content-size'
};
function update(dump) {
    //console.log("UPDATE")
    this.dump = dump;
    this.$.portraitAlignment.dump = this.dump.value.portraitAlignment;
    this.$.portraitAlignment.value = this.dump.value.portraitAlignment.value;
    this.$.landscapeAlignment.dump = this.dump.value.landscapeAlignment;
    this.$.landscapeAlignment.value = this.dump.value.landscapeAlignment.value;
    this.componentHandlers.forEach((handler) => {
        handler.htmlEl.dump = this.dump.value[handler.scriptEl];
        handler.htmlEl.value = this.dump.value[handler.scriptEl].value;
    });
    console.log("TEST123");
    //if (!this.oneTimeFlag) {
    //this.oneTimeFlag = true;
    // //if .active class added so classList length is 1
    const lastCell = getLastCell(this, this.$.portraitButton.classList.length == 1 ? this.dump.value.portraitAlignment.value : this.dump.value.landscapeAlignment.value);
    cellOnClick(this, lastCell, this.tree);
    // setTimeout(() => {
    //     this.oneTimeFlag = false;
    // }, 500);
    //}
    if (!this.oneTimeFlag) {
        this.oneTimeFlag = true;
        if (this.dump.value.enableLandscape.value == true) { // same block exists below, adjust this later
            this.$.disabledContent.className = "";
        }
        else {
            this.$.disabledContent.className = "disable";
        }
    }
}
exports.update = update;
function ready() {
    // Listen for commit events on the input, update the dump data when the input commits data, and use prop to send change-dump events
    //console.log("READY")
    // const refreshCell = () => {
    //     //sometimes when a ref node is added, node placement is not updated, to fix this I added this method
    //     const lastCell = getLastCell(this, this.dump.value.portraitAlignment.value);
    //     cellOnClick(this, lastCell, this.tree);
    // }
    this.componentHandlers = [
        {
            htmlEl: this.$.portraitWidthRatio,
            scriptEl: "portraitWidthRatio",
            onChange: true
        },
        {
            htmlEl: this.$.portraitHeightRatio,
            scriptEl: "portraitHeightRatio",
            onChange: true
        },
        {
            htmlEl: this.$.portraitHorSpace,
            scriptEl: "portraitHorSpace",
            onChange: true
        },
        {
            htmlEl: this.$.portraitVerSpace,
            scriptEl: "portraitVerSpace",
            onChange: true
        },
        {
            htmlEl: this.$.portraitMinMax,
            scriptEl: "portraitMinMax",
            onChange: true
        },
        {
            htmlEl: this.$.portraitVerSpaceType,
            scriptEl: "portraitVerSpaceType",
            onChange: true
        },
        {
            htmlEl: this.$.portraitHorSpaceType,
            scriptEl: "portraitHorSpaceType",
            onChange: true
        },
        {
            htmlEl: this.$.portraitLeftNodeUUID,
            scriptEl: "portraitLeftNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.portraitRightNodeUUID,
            scriptEl: "portraitRightNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.portraitTopNodeUUID,
            scriptEl: "portraitTopNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.portraitBottomNodeUUID,
            scriptEl: "portraitBottomNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.portraitFlipX,
            scriptEl: "portraitFlipX",
            onChange: true
        },
        {
            htmlEl: this.$.portraitFlipY,
            scriptEl: "portraitFlipY",
            onChange: true
        },
        {
            htmlEl: this.$.enableLandscape,
            scriptEl: "enableLandscape",
            onChange: true,
            callback: () => {
                /* disabled_content */
                if (this.dump.value.enableLandscape.value == true) {
                    this.$.disabledContent.className = "";
                }
                else {
                    this.$.disabledContent.className = "disable";
                }
            }
        },
        {
            htmlEl: this.$.landscapeWidthRatio,
            scriptEl: "landscapeWidthRatio",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeHeightRatio,
            scriptEl: "landscapeHeightRatio",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeHorSpace,
            scriptEl: "landscapeHorSpace",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeVerSpace,
            scriptEl: "landscapeVerSpace",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeMinMax,
            scriptEl: "landscapeMinMax",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeVerSpaceType,
            scriptEl: "landscapeVerSpaceType",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeFlipX,
            scriptEl: "landscapeFlipX",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeFlipY,
            scriptEl: "landscapeFlipY",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeHorSpaceType,
            scriptEl: "landscapeHorSpaceType",
            onChange: true
        },
        {
            htmlEl: this.$.landscapeLeftNodeUUID,
            scriptEl: "landscapeLeftNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeRightNodeUUID,
            scriptEl: "landscapeRightNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeTopNodeUUID,
            scriptEl: "landscapeTopNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.landscapeBottomNodeUUID,
            scriptEl: "landscapeBottomNodeUUID",
            onChange: true,
            // callback: () => {
            //     refreshCell();
            // }
        },
        {
            htmlEl: this.$.rotateCanvas,
            scriptEl: "rotateCanvas",
            onChange: false,
            callback: () => {
                this.dump.value.rotateCanvas.value = true;
            }
        },
        {
            htmlEl: this.$.rotateCanvasPortrait,
            scriptEl: "rotateCanvasPortrait",
            onChange: false,
        },
        {
            htmlEl: this.$.rotateCanvasLandscape,
            scriptEl: "rotateCanvasLandscape",
            onChange: false,
        },
        {
            htmlEl: this.$.changeEditorDevice,
            scriptEl: "changeEditorDevice",
            onChange: false,
            callback: () => {
                this.dump.value.changeEditorDevice.value = true;
            }
        },
        {
            htmlEl: this.$.alignMode,
            scriptEl: "alignMode",
            onChange: true
        },
        {
            htmlEl: this.$.isCalculatingContainerBounds,
            scriptEl: "isCalculatingContainerBounds",
            onChange: true,
        },
        {
            htmlEl: this.$.isPositioningFromAnchorPoint,
            scriptEl: "isPositioningFromAnchorPoint",
            onChange: true
        },
        // {
        //     htmlEl: this.$.oneTimeExecution,
        //     scriptEl: "oneTimeExecution",
        //     onChange: true,
        //     callback: () => {
        //         this.dump.value..value = false;
        //     }oneTimeExecution
        // },
    ];
    this.componentHandlers.forEach((handler) => {
        handler.htmlEl.addEventListener('confirm', (e) => {
            this.dump.value[handler.scriptEl].value = e.target.value;
            if (handler.callback) {
                handler.callback();
            }
            handler.htmlEl.dispatch('change-dump');
        });
        if (handler.onChange) {
            handler.htmlEl.onchange = (e) => {
                this.dump.value[handler.scriptEl].value = e.target.value;
                if (handler.callback) {
                    handler.callback();
                }
                handler.htmlEl.dispatch('change-dump');
            };
        }
    });
    let openTab = (target, tabName) => {
        this.$.portrait.style.display = "none";
        this.$.landscape.style.display = "none";
        this.$.settings.style.display = "none";
        this.$.portraitButton.className = this.$.portraitButton.className.replace(" active", "");
        this.$.landscapeButton.className = this.$.landscapeButton.className.replace(" active", "");
        this.$.settingsButton.className = this.$.settingsButton.className.replace(" active", "");
        if (tabName == "Portrait") {
            this.$.portrait.style.display = "block";
        }
        else if (tabName == "Landscape") {
            this.$.landscape.style.display = "block";
        }
        else {
            this.$.settings.style.display = "block";
        }
        target.className += " active";
    };
    this.$.portraitButton.onclick = (e) => {
        openTab(this.$.portraitButton, 'Portrait');
        const lastCell = getLastCell(this, this.dump.value.portraitAlignment.value);
        cellOnClick(this, lastCell, this.tree);
        this.dump.value.rotateCanvasPortrait.value = true;
        this.$.rotateCanvasPortrait.dispatch('change-dump');
    };
    this.$.landscapeButton.onclick = (e) => {
        openTab(this.$.landscapeButton, 'Landscape');
        const lastCell = getLastCell(this, this.dump.value.landscapeAlignment.value);
        cellOnClick(this, lastCell, this.tree);
        this.dump.value.rotateCanvasLandscape.value = true;
        this.$.rotateCanvasLandscape.dispatch('change-dump');
    };
    this.$.settingsButton.onclick = (e) => {
        openTab(this.$.settingsButton, 'Settings');
    };
    openTab(this.$.portraitButton, 'Portrait');
    this.tree = [
        {
            cell: this.$.portraitTopLeft,
        },
        {
            cell: this.$.portraitTopCenter,
        },
        {
            cell: this.$.portraitTopRight,
        },
        {
            cell: this.$.portraitMidLeft,
        },
        {
            cell: this.$.portraitMidCenter,
        },
        {
            cell: this.$.portraitMidRight,
        },
        {
            cell: this.$.portraitBottomLeft,
        },
        {
            cell: this.$.portraitBottomCenter,
        },
        {
            cell: this.$.portraitBottomRight,
        },
        {
            cell: this.$.landscapeTopLeft,
        },
        {
            cell: this.$.landscapeTopCenter,
        },
        {
            cell: this.$.landscapeTopRight,
        },
        {
            cell: this.$.landscapeMidLeft,
        },
        {
            cell: this.$.landscapeMidCenter,
        },
        {
            cell: this.$.landscapeMidRight,
        },
        {
            cell: this.$.landscapeBottomLeft,
        },
        {
            cell: this.$.landscapeBottomCenter,
        },
        {
            cell: this.$.landscapeBottomRight,
        }
    ];
    this.tree.forEach((e, i) => {
        e.cell.addEventListener('confirm', () => {
            cellOnClick(this, e.cell, this.tree);
        });
    });
}
exports.ready = ready;
function cellOnClick(_this, clickedCell, tree) {
    for (var i = 0; i < tree.length; i++) {
        const e = tree[i];
        e.cell.style.background = "#303C4A";
    }
    clickedCell.style.background = "#F58D1E";
    if (clickedCell.id.includes("portrait")) {
        //console.log("P");
        _this.dump.value.portraitAlignment.value = clickedCell.id;
        _this.$.portraitAlignment.dispatch('change-dump');
    }
    else {
        //console.log("L");
        _this.dump.value.landscapeAlignment.value = clickedCell.id;
        _this.$.landscapeAlignment.dispatch('change-dump');
    }
    //console.log("????????????????", _this.dump.value.portraitAlignment.value)
}
function getLastCell(_this, id) {
    if (id == "portrait-top-left") {
        return _this.$.portraitTopLeft;
    }
    else if (id == "portrait-top-center") {
        return _this.$.portraitTopCenter;
    }
    else if (id == "portrait-top-right") {
        return _this.$.portraitTopRight;
    }
    else if (id == "portrait-mid-left") {
        return _this.$.portraitMidLeft;
    }
    else if (id == "portrait-mid-center") {
        return _this.$.portraitMidCenter;
    }
    else if (id == "portrait-mid-right") {
        return _this.$.portraitMidRight;
    }
    else if (id == "portrait-bottom-left") {
        return _this.$.portraitBottomLeft;
    }
    else if (id == "portrait-bottom-center") {
        return _this.$.portraitBottomCenter;
    }
    else if (id == "portrait-bottom-right") {
        return _this.$.portraitBottomRight;
    }
    else if (id == "landscape-top-left") {
        return _this.$.landscapeTopLeft;
    }
    else if (id == "landscape-top-center") {
        return _this.$.landscapeTopCenter;
    }
    else if (id == "landscape-top-right") {
        return _this.$.landscapeTopRight;
    }
    else if (id == "landscape-mid-left") {
        return _this.$.landscapeMidLeft;
    }
    else if (id == "landscape-mid-center") {
        return _this.$.landscapeMidCenter;
    }
    else if (id == "landscape-mid-right") {
        return _this.$.landscapeMidRight;
    }
    else if (id == "landscape-bottom-left") {
        return _this.$.landscapeBottomLeft;
    }
    else if (id == "landscape-bottom-center") {
        return _this.$.landscapeBottomCenter;
    }
    else if (id == "landscape-bottom-right") {
        return _this.$.landscapeBottomRight;
    }
}
