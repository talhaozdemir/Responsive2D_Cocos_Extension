import { _decorator, Component, Node, CCFloat, Enum, view, UITransform, screen, find, Vec3, Canvas } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, disallowMultiple, executeInEditMode } = _decorator;

@ccclass('Responsive2D')
@disallowMultiple(true)
@executeInEditMode(true)
export class Responsive2D extends Component {
    @property
    public portraitWidthRatio = 0.25;
    @property
    public portraitHeightRatio = 0.25;
    @property
    public portraitHorSpace = 0;
    @property
    public portraitHorSpaceType = 1;
    @property
    public portraitVerSpace = 0;
    @property
    public portraitVerSpaceType = 1;
    @property
    public portraitAlignment = "portrait-mid-center";
    @property
    public portraitTopNodeUUID = ""; //UUID
    @property
    public portraitBottomNodeUUID = "";
    @property
    public portraitLeftNodeUUID = "";
    @property
    public portraitRightNodeUUID = "";
    @property
    public portraitFollowNode = false;
    @property
    public portraitFollowedNodeUUID = "";
    @property
    public portraitMinMax = 1;
    @property
    public portraitFlipX = false;
    @property
    public portraitFlipY = false;

    @property
    public enableLandscape = false;
    @property
    public landscapeWidthRatio = 0.25;
    @property
    public landscapeHeightRatio = 0.25;
    @property
    public landscapeHorSpace = 0;
    @property
    public landscapeHorSpaceType = 1;
    @property
    public landscapeVerSpace = 0;
    @property
    public landscapeVerSpaceType = 1;
    @property
    public landscapeAlignment = "landscape-mid-center";
    @property
    public landscapeTopNodeUUID = ""; //UUID
    @property
    public landscapeBottomNodeUUID = "";
    @property
    public landscapeLeftNodeUUID = "";
    @property
    public landscapeRightNodeUUID = "";
    @property
    public landscapeFollowNode = false;
    @property
    public landscapeFollowedNodeUUID = false;
    @property
    @property
    public landscapeMinMax = 1;
    @property
    public landscapeFlipX = false;
    @property
    public landscapeFlipY = false;


    @property
    public isCalculatingContainerBounds = false;
    @property
    public isPositioningFromAnchorPoint = false;
    @property
    public alignMode = 3;

    @property
    public usingMinOrMax = 0; // change editor slider color according to min max


    @property
    public rotateCanvas = false;

    @property
    public rotateCanvasPortrait = false;
    @property
    public rotateCanvasLandscape = false;

    @property
    public changeEditorDevice = false;

    @property
    public oneTimeExecution = false;

    @property
    public lastOrientation = globalThis.rotateCanvas;

    @property
    public currentNodeInEditorFlag = false;
    @property
    public currentNodeInEditor = null;

    private contAnchorXInEditor = 0;
    private contAnchorYInEditor = 0;

    private contAnchorX = 0;
    private contAnchorY = 0;
    private nodeOffsetWidth = 0;
    private nodeOffsetHeight = 0;

    private isEventsAdded = false;
    private refNodes = [];
    private nodeInd = null;
    private canUpdate = true;

    start() {
        this.oneTimeExecution = false;

        if (this.alignMode == 3) {
            view.on('canvas-resize', () => {
                this.resize();
            });
        }
        this.resize();
    }

    resize() {

        if (!this.canUpdate) {
            return;
        }

        if (this.currentNodeInEditorFlag && globalThis.currentNodeInEditor != this.node.uuid) {
            this.currentNodeInEditorFlag = false;

            this.currentNodeInEditor = this.node.uuid;
            globalThis.currentNodeInEditor = this.currentNodeInEditor;
            console.log(this.currentNodeInEditor, this.node.name)

        }

        if (EDITOR) {
            this.rotateUiCanvas();
            this.switchDevice();
        }

        const node = this.node;
        this.nodeInd = this.node.parent.children.indexOf(node);
        const nodeTransform = node.getComponent(UITransform);

        var deviceSize;
        if (EDITOR) {
            deviceSize = view.getDesignResolutionSize();
        }

        const screenSize = screen.windowSize;
        const viewScaleX = view.getScaleX();
        const viewScaleY = view.getScaleY();
        let w = (deviceSize && deviceSize.width) || screenSize.width / viewScaleX;
        let h = (deviceSize && deviceSize.height) || screenSize.height / viewScaleY;

        //console.log(this.node.parent.name, this.node.name)

        if (!this.node.parent.getComponent(Canvas)) {
            const parentTransform = this.node.parent.getComponent(UITransform);
            w = parentTransform.width;
            h = parentTransform.height;
        }

        const mostLeft = -w * 0.5;
        const mostRight = w * 0.5;
        const mostTop = h * 0.5;
        const mostBottom = -h * 0.5;
        let width = w;
        let height = h;
        let left = mostLeft;
        let right = mostRight;
        let top = mostTop;
        let bottom = mostBottom;

        let widthRatio = (w > h && this.enableLandscape) ? this.landscapeWidthRatio : this.portraitWidthRatio;
        let heightRatio = (w > h && this.enableLandscape) ? this.landscapeHeightRatio : this.portraitHeightRatio;
        let minMax = (w > h && this.enableLandscape) ? this.landscapeMinMax : this.portraitMinMax;
        let leftNodeUUID = (w > h && this.enableLandscape) ? this.landscapeLeftNodeUUID : this.portraitLeftNodeUUID;
        let rightNodeUUID = (w > h && this.enableLandscape) ? this.landscapeRightNodeUUID : this.portraitRightNodeUUID;
        let topNodeUUID = (w > h && this.enableLandscape) ? this.landscapeTopNodeUUID : this.portraitTopNodeUUID;
        let bottomNodeUUID = (w > h && this.enableLandscape) ? this.landscapeBottomNodeUUID : this.portraitBottomNodeUUID;
        let canFollowNode = (w > h && this.enableLandscape) ? this.landscapeFollowNode : this.portraitFollowNode;
        let followedNodeUUID = (w > h && this.enableLandscape) ? this.landscapeFollowedNodeUUID : this.portraitFollowedNodeUUID;
        let alignment = (w > h && this.enableLandscape) ? this.landscapeAlignment : this.portraitAlignment;
        let horSpace = (w > h && this.enableLandscape) ? this.landscapeHorSpace : this.portraitHorSpace;
        let verSpace = (w > h && this.enableLandscape) ? this.landscapeVerSpace : this.portraitVerSpace;
        let horizontalSpaceType = (w > h && this.enableLandscape) ? this.landscapeHorSpaceType : this.portraitHorSpaceType;
        let verticalSpaceType = (w > h && this.enableLandscape) ? this.landscapeVerSpaceType : this.portraitVerSpaceType;
        let flipX = (w > h && this.enableLandscape) ? this.landscapeFlipX : this.portraitFlipX;
        let flipY = (w > h && this.enableLandscape) ? this.landscapeFlipY : this.portraitFlipY;

        let allChildNodes;
        if (!this.node.parent.getComponent(Canvas)) {
            allChildNodes = this.node.parent;
        } else {
            allChildNodes = find("Canvas");
        }

        let leftNode = null;
        let rightNode = null;
        let topNode = null;
        let bottomNode = null;

        this.refNodes = [];
        allChildNodes && allChildNodes.children.forEach(child => {
            if (child.uuid == leftNodeUUID) {
                leftNode = child;
                this.refNodes.push(leftNode);
            }

            if (child.uuid == rightNodeUUID) {
                rightNode = child;
                this.refNodes.push(rightNode);
            }

            if (child.uuid == topNodeUUID) {
                topNode = child;
                this.refNodes.push(topNode);
            }

            if (child.uuid == bottomNodeUUID) {
                bottomNode = child;
                this.refNodes.push(bottomNode);
            }
        });

        let followedNode;
        if (canFollowNode && followedNodeUUID) {
            followedNode = findFollewedNode(followedNodeUUID);
        }


        //console.log("RESPONSIVE 2D START", this.node.name, this.node.children.length, this.isCalculatingContainerBounds, this.oneTimeExecution)
        if (this.node.children.length /* && !this.node.getComponent(Sprite) && !this.node.getComponent(sp.Skeleton) */ && this.isCalculatingContainerBounds && !this.oneTimeExecution) {
            /* NOT TESTED FOR DIFFERENT NODES */
            this.oneTimeExecution = true;

            const contTransform = this.node.getComponent(UITransform);
            this.contAnchorXInEditor = contTransform.anchorX;
            this.contAnchorYInEditor = contTransform.anchorY;

            const { minX, minY, width, height } = this.calculateContainerBounds();
            contTransform.setContentSize(width, height);


            this.contAnchorX = 0.5 - (contTransform.width * 0.5 + minX) / contTransform.width;
            this.contAnchorY = 0.5 - (contTransform.height * 0.5 + minY) / contTransform.height;

            contTransform.setAnchorPoint(
                this.contAnchorX,
                this.contAnchorY
            );

            if (!this.isEventsAdded) {
                this.addEvents();
            }
        }

        // ***
        this.resizeRefNodesIfTheirRenderOrdersAreAfterThisNode();

        if (leftNode) {
            const leftNodeInd = leftNode.parent.children.indexOf(leftNode);
            if (leftNodeInd > this.nodeInd) {
                const r2d = leftNode.getComponent(Responsive2D);
                if (r2d) {
                    r2d.resize();
                }
            }

            const leftNodeTransform = leftNode.getComponent(UITransform);
            leftNode.displayWidth = leftNodeTransform.width * Math.abs(leftNode.scale.x);
            leftNode.displayHeight = leftNodeTransform.height * Math.abs(leftNode.scale.y);

            left = leftNode.position.x + leftNode.displayWidth * (1 - leftNodeTransform.anchorX);
            //width -= Math.abs(mostLeft - leftNode.position.x) + leftNodeTransform.width * leftNode.scale.x * (1 - leftNodeTransform.anchorX);
            width -= Math.abs(mostLeft - left);
        }

        if (rightNode) {
            const rightNodeInd = rightNode.parent.children.indexOf(rightNode);
            if (rightNodeInd > this.nodeInd) {
                const r2d = rightNode.getComponent(Responsive2D);
                if (r2d) {
                    r2d.resize();
                }
            }

            const rightNodeTransform = rightNode.getComponent(UITransform);
            rightNode.displayWidth = rightNodeTransform.width * Math.abs(rightNode.scale.x);
            rightNode.displayHeight = rightNodeTransform.height * Math.abs(rightNode.scale.y);

            right = rightNode.position.x - rightNode.displayWidth * (rightNodeTransform.anchorX);
            //width -= Math.abs(mostRight - rightNode.position.x) + rightNodeTransform.width * rightNode.scale.x * (rightNodeTransform.anchorX);
            width -= Math.abs(mostRight - right);
        }

        if (topNode) {
            const topNodeInd = topNode.parent.children.indexOf(topNode);
            if (topNodeInd > this.nodeInd) {
                const r2d = topNode.getComponent(Responsive2D);
                if (r2d) {
                    r2d.resize();
                }
            }

            const topNodeTransform = topNode.getComponent(UITransform);
            topNode.displayWidth = topNodeTransform.width * Math.abs(topNode.scale.x);
            topNode.displayHeight = topNodeTransform.height * Math.abs(topNode.scale.y);

            top = topNode.position.y - topNode.displayHeight * topNodeTransform.anchorY;
            //height -= Math.abs(mostTop - topNode.position.y) + topNodeTransform.height * topNode.scale.y * topNodeTransform.anchorY;
            height -= Math.abs(mostTop - top);
        }

        if (bottomNode) {
            const bottomNodeInd = bottomNode.parent.children.indexOf(bottomNode);
            if (bottomNodeInd > this.nodeInd) {
                const r2d = bottomNode.getComponent(Responsive2D);
                if (r2d) {
                    r2d.resize();
                }
            }

            const bottomNodeTransform = bottomNode.getComponent(UITransform);
            bottomNode.displayWidth = bottomNodeTransform.width * Math.abs(bottomNode.scale.x);
            bottomNode.displayHeight = bottomNodeTransform.height * Math.abs(bottomNode.scale.y);

            bottom = bottomNode.position.y + bottomNode.displayHeight * (1 - bottomNodeTransform.anchorY);
            //height -= Math.abs(mostBottom - bottomNode.position.y) + bottomNodeTransform.height * bottomNode.scale.y * (1 - bottomNodeTransform.anchorY);
            height -= Math.abs(mostBottom - bottom);
        }

        if (canFollowNode && followedNode) {
            const r2d = followedNode.getComponent(Responsive2D);
            if (r2d) {
                r2d.resize();
            }

            const followedNodeTransform = followedNode.getComponent(UITransform);
            followedNode.displayWidth = followedNodeTransform.width * Math.abs(followedNode.scale.x);
            followedNode.displayHeight = followedNodeTransform.height * Math.abs(followedNode.scale.y);
        }


        let scaleX;
        let scaleY;
        const scaleObj = { x: width * widthRatio / nodeTransform.width, y: height * heightRatio / nodeTransform.height }
        if (minMax == 1) {
            let scale = Math.min(scaleObj.x, scaleObj.y);
            scaleX = scale;
            scaleY = scale;
            changeEditorSliderCursorColor(this, 1, scaleObj);
        } else if (minMax == 2) {
            let scale = Math.max(scaleObj.x, scaleObj.y);
            scaleX = scale;
            scaleY = scale;
            changeEditorSliderCursorColor(this, 2, scaleObj);
        } else if (minMax == 3) {
            scaleX = scaleObj.x;
            scaleY = scaleObj.y;
            changeEditorSliderCursorColor(this, 3, scaleObj);
        }

        let flipScalar = { x: 1, y: 1 };
        !flipX ? flipScalar.x = 1 : flipScalar.x = -1;
        !flipY ? flipScalar.y = 1 : flipScalar.y = -1;

        node.setScale(new Vec3(scaleX * flipScalar.x, scaleY * flipScalar.y, node.scale.z));

        const nodeDisplayWidth = nodeTransform.width * scaleX;
        const nodeDisplayHeight = nodeTransform.height * scaleY;

        this.nodeOffsetWidth = nodeDisplayWidth * (this.contAnchorX - this.contAnchorXInEditor);
        this.nodeOffsetHeight = nodeDisplayHeight * (this.contAnchorY - this.contAnchorYInEditor);

        //console.log(nodeDisplayWidth, this.contAnchorX, this.contAnchorXInEditor, this.node.name)
        //console.log(widthRatio, heightRatio)

        if (canFollowNode && followedNode) {
            followedNode.worldPos = getWorldPos(this.node, followedNode);
        }

        const splittedAlignment = alignment.split("-");

        if (alignment) {
            var hSpace;
            if (horizontalSpaceType == 1) {
                hSpace = (horSpace * 0.01) * w;
            } else if (horizontalSpaceType == 2) {
                hSpace = horSpace;
            } else if (horizontalSpaceType == 3) {
                hSpace = (horSpace * 0.01) * nodeDisplayWidth;
            } else if (horizontalSpaceType == 4) { // left node
                hSpace = (horSpace * 0.01) * (leftNode ? leftNode.displayWidth : width);
                !leftNode && console.warn("leftNode cannot found! Using available width hSpace for " + this.node.name);
            } else if (horizontalSpaceType == 5) { // right node
                hSpace = (horSpace * 0.01) * (rightNode ? rightNode.displayWidth : width);
                !rightNode && console.warn("rightNode cannot found! Using available width hSpace for " + this.node.name);
            } else if (horizontalSpaceType == 6) { // top node
                hSpace = (horSpace * 0.01) * (topNode ? topNode.displayWidth : width);
                !topNode && console.warn("topNode cannot found! Using available width hSpace for " + this.node.name);
            } else if (horizontalSpaceType == 7) { // bottom node
                hSpace = (horSpace * 0.01) * (bottomNode ? bottomNode.displayWidth : width);
                !bottomNode && console.warn("bottomNode cannot found! Using available width hSpace for " + this.node.name);
            } else if (horizontalSpaceType == 8) { // followed node
                hSpace = (horSpace * 0.01) * (followedNode ? followedNode.displayWidth : width);
                !followedNode && console.warn("followedNode cannot found! Using available width hSpace for " + this.node.name);
            }

            var vSpace;
            if (verticalSpaceType == 1) {
                vSpace = (verSpace * 0.01) * h;
            } else if (verticalSpaceType == 2) {
                vSpace = verSpace;
            } else if (verticalSpaceType == 3) {
                vSpace = (verSpace * 0.01) * nodeDisplayHeight;
            } else if (verticalSpaceType == 4) { // left node
                vSpace = (verSpace * 0.01) * (leftNode ? leftNode.displayHeight : height);
                !leftNode && console.warn("leftNode cannot found! Using available height vSpace for " + this.node.name);
            } else if (verticalSpaceType == 5) { // right node
                vSpace = (verSpace * 0.01) * (rightNode ? rightNode.displayHeight : height);
                !rightNode && console.warn("rightNode cannot found! Using available height vSpace for " + this.node.name);
            } else if (verticalSpaceType == 6) { // top node
                vSpace = (verSpace * 0.01) * (topNode ? topNode.displayHeight : height);
                !topNode && console.warn("topNode cannot found! Using available height vSpace for " + this.node.name);
            } else if (verticalSpaceType == 7) { // bottom node
                vSpace = (verSpace * 0.01) * (bottomNode ? bottomNode.displayHeight : height);
                !bottomNode && console.warn("bottomNode cannot found! Using available height vSpace for " + this.node.name);
            } else if (verticalSpaceType == 8) { // follow node
                vSpace = (verSpace * 0.01) * (followedNode ? followedNode.displayHeight : height);
                !followedNode && console.warn("followedNode cannot found! Using available height vSpace for " + this.node.name);
            }

            if (canFollowNode && followedNode) {
                node.setPosition(
                    followedNode.worldPos.x + hSpace,
                    followedNode.worldPos.y + vSpace,
                    node.position.z
                );
                return;
            }

            switch (splittedAlignment[2]) {
                case "left": //left

                    var offsetWidth;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetWidth = this.nodeOffsetWidth;
                        } else {
                            offsetWidth = 0;
                        }
                    } else {
                        offsetWidth = nodeDisplayWidth * nodeTransform.anchorX;
                    }



                    node.setPosition(
                        left + hSpace + offsetWidth,
                        node.position.y,
                        node.position.z
                    );
                    break;
                case "center": //center

                    var offsetWidth;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetWidth = this.nodeOffsetWidth;
                        } else {
                            offsetWidth = 0;
                        }
                    } else {
                        offsetWidth = nodeDisplayWidth * -(0.5 - nodeTransform.anchorX);
                    }


                    node.setPosition(
                        0 + hSpace + (left + right) * 0.5 + offsetWidth,
                        node.position.y,
                        node.position.z
                    );
                    break;
                case "right": //right

                    var offsetWidth;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetWidth = this.nodeOffsetWidth;
                        } else {
                            offsetWidth = 0;
                        }
                    } else {
                        offsetWidth = -nodeDisplayWidth * (1 - nodeTransform.anchorX);
                    }

                    node.setPosition(
                        right + hSpace + offsetWidth,
                        node.position.y,
                        node.position.z
                    );
                    break;
            }

            switch (splittedAlignment[1]) {
                case "top": //top
                    var offsetHeight;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetHeight = this.nodeOffsetHeight;
                        } else {
                            offsetHeight = 0;
                        }
                    } else {
                        offsetHeight = -nodeDisplayHeight * (1 - nodeTransform.anchorY);
                    }

                    node.setPosition(
                        node.position.x,
                        top + vSpace + offsetHeight,
                        node.position.z
                    );
                    break;
                case "mid": //middle
                    var offsetHeight;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetHeight = this.nodeOffsetHeight;
                        } else {
                            offsetHeight = 0;
                        }
                    } else {
                        offsetHeight = nodeDisplayHeight * -(0.5 - nodeTransform.anchorY);
                    }

                    node.setPosition(
                        node.position.x,
                        0 + vSpace + (top + bottom) * 0.5 + offsetHeight,
                        node.position.z
                    );
                    break;
                case "bottom": //bottom
                    var offsetHeight;
                    if (this.isPositioningFromAnchorPoint) {
                        if (this.isCalculatingContainerBounds) {
                            offsetHeight = this.nodeOffsetHeight;
                        } else {
                            offsetHeight = 0;
                        }
                    } else {
                        offsetHeight = nodeDisplayHeight * nodeTransform.anchorY;
                    }

                    node.setPosition(
                        node.position.x,
                        bottom + vSpace + offsetHeight,
                        node.position.z
                    );
                    break;
            }
        }
    }

    calculateContainerBounds() {
        const children = this.node.children;

        const firstChildBoundingBox = children[0].getComponent(UITransform).getBoundingBox();
        let bb = firstChildBoundingBox;
        let minX = Math.min(firstChildBoundingBox.xMin, 0),
            minY = Math.min(firstChildBoundingBox.yMin, 0),
            maxX = Math.max(firstChildBoundingBox.xMax, 0),
            maxY = Math.max(firstChildBoundingBox.yMax, 0);

        for (let i = 1; i < children.length; i++) {
            bb = children[i].getComponent(UITransform).getBoundingBox();
            // console.log(bb)
            minX = Math.min(minX, bb.xMin);
            minY = Math.min(minY, bb.yMin);
            maxX = Math.max(maxX, bb.xMax);
            maxY = Math.max(maxY, bb.yMax);
        }

        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: maxX - minX, height: maxY - minY };
    }

    resizeRefNodesIfTheirRenderOrdersAreAfterThisNode() {
        this.refNodes.forEach(refNode => {
            if (refNode.parent == this.node.parent) {
                const refNodeInd = refNode.parent.children.indexOf(refNode);

                if (refNodeInd > this.nodeInd) {

                    const responsivePluginOfRefNode = refNode.getComponent(Responsive2D);

                    if (responsivePluginOfRefNode) {
                        responsivePluginOfRefNode.resize();
                        if (responsivePluginOfRefNode.refNodes.includes(this.node)) {
                            console.warn(this.node.name + " and " + refNode.name + " nodes referance each other, this may result with awkward results!");
                        }
                    }
                }
            } else {
                console.warn(this.node.name + " and " + refNode.name + " have different parents!")
            }
        })
    }

    addEvents() {
        this.isEventsAdded = true;

        this.node.children.forEach(child => {
            child.on(Node.EventType.TRANSFORM_CHANGED, () => {
                this.oneTimeExecution = false;
            });

            child.on(Node.EventType.SIZE_CHANGED, () => {
                this.oneTimeExecution = false;
            })
        });

        this.node.on(Node.EventType.CHILD_ADDED, (e) => {

            e.on(Node.EventType.TRANSFORM_CHANGED, () => {
                this.oneTimeExecution = false;
            })
            e.on(Node.EventType.SIZE_CHANGED, () => {
                this.oneTimeExecution = false;
            })

            this.oneTimeExecution = false;
        })

        this.node.on(Node.EventType.CHILD_REMOVED, () => {
            this.oneTimeExecution = false;
        })
    }

    rotateUiCanvas() {
        if (this.rotateCanvas) {
            this.rotateCanvas = false;
            globalThis.rotateCanvas = !globalThis.rotateCanvas;
            setEditorDeviceAndCanvasDesignResolution();
        }

        if (this.rotateCanvasPortrait) {
            this.rotateCanvasPortrait = false;
            globalThis.rotateCanvas = true;
            setEditorDeviceAndCanvasDesignResolution();
        }

        if (this.rotateCanvasLandscape) {
            this.rotateCanvasLandscape = false;
            globalThis.rotateCanvas = false;
            setEditorDeviceAndCanvasDesignResolution();
        }

        this.lastOrientation = globalThis.rotateCanvas;
    }

    switchDevice() {
        if (this.changeEditorDevice) {
            this.changeEditorDevice = false;
            globalThis.editorDeviceNo = (globalThis.editorDeviceNo + 1) % 3 + 1;
            setEditorDeviceAndCanvasDesignResolution();
        }
    }

    update(deltaTime) {
        if (EDITOR) {
            this.resize();
            //console.log("UPDATE")
        } else {
            if (this.alignMode == 2) {
                this.resize();
            }
        }
    }

    onEnable() {
        //console.log("ENABLED");
        this.canUpdate = true;
    }

    onDisable() {
        //console.log("DISABLED");
        this.canUpdate = false;
    }

}

function setEditorDeviceAndCanvasDesignResolution() {
    if (!globalThis.editorDeviceNo) {
        globalThis.editorDeviceNo = 1;
        globalThis.rotateCanvas = true;
    }

    var deviceSize = getDeviceSize(globalThis.editorDeviceNo, globalThis.rotateCanvas);

    const screenSize = screen.windowSize;
    const viewScaleX = view.getScaleX();
    const viewScaleY = view.getScaleY();
    let w = (deviceSize && deviceSize.width) || screenSize.width / viewScaleX;
    let h = (deviceSize && deviceSize.height) || screenSize.height / viewScaleY;

    view.setDesignResolutionSize(w, h, view.getResolutionPolicy());
    //  view.resizeWithBrowserSize(true);
}

function getDeviceSize(deviceType, orientation) {
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

function changeEditorSliderCursorColor(_this, type, scaleObj) {
    if (!EDITOR) {
        return;
    }

    if (type == 1) {
        if (scaleObj.x < scaleObj.y) {
            _this.usingMinOrMax = 1; // width ratio will be green
        } else if (scaleObj.x > scaleObj.y) {
            _this.usingMinOrMax = 2; // height ratio will be green
        } else {
            _this.usingMinOrMax = 0;
        }
    } else if (type == 2) {
        if (scaleObj.x < scaleObj.y) {
            _this.usingMinOrMax = 2; // height ratio will be green
        } else if (scaleObj.x > scaleObj.y) {
            _this.usingMinOrMax = 1; // width ratio will be green
        } else {
            _this.usingMinOrMax = 0;
        }
    } else if (type == 3) {
        _this.usingMinOrMax = 0;
    }
}

function findFollewedNode(followedNodeUUID) {
    let foundedNode;
    function search(ch) {
        if (ch.children.length == 0) {
            return
        }
        for (let i = 0; i < ch.children.length; i++) {
            const c = ch.children[i];
            if (c.uuid == followedNodeUUID) {
                foundedNode = c;
                break;
            } else {
                if (c.children) {
                    search(c);
                }
            }
        }
    }
    search(find("Canvas"));
    return foundedNode;
}

function getWorldPos(node, targetNode) {

    const targetNodeParentUITransform = targetNode.parent.getComponent(UITransform);
    const nodeParentUITransform = node.parent.getComponent(UITransform);

    var targetNodeParentPos = targetNodeParentUITransform.convertToWorldSpaceAR(targetNode.position);
    var nodeParentPos = nodeParentUITransform.convertToNodeSpaceAR(targetNodeParentPos);
    return { x: nodeParentPos.x, y: nodeParentPos.y }
}