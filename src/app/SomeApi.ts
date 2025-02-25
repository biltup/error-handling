import {Injectable} from "@angular/core";

export class FetchRequest {
}

export class FetchResponse {
    public status?: number;
    public message?: string;
}

@Injectable({ providedIn: 'root' })
export class FakeApi {

    async fetchRemote(request: FetchRequest): Promise<FetchResponse> {
        //make truly async over the wire so we response 3 seconds later
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = new FetchResponse();
                response.message = "Fake message from server";
                response.status = 200;

                //reject(new Error('failure here'));
                resolve(response);
            }, 3000); // Wait for 3 seconds
        });
    }
}