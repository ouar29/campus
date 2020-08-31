export interface InfoCardModel {
    roomName: string;
    roomLocation: string;
    restrictedAccess: boolean;
}

export class InfoCardBuilder {

    static newInfoCard(model: InfoCardModel): HTMLElement {
        const newDiv = document.createElement("div");
        newDiv.className = "infocard";
        const title = document.createElement("h1");
        title.textContent = model.roomName;
        newDiv.appendChild(title);

        newDiv.appendChild(document.createTextNode(model.roomLocation));

        return newDiv;
        // document.body.appendChild(newDiv);
    }

}