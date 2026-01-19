import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface FeaturedImage {
  file: File;
  preview: string;
}

@Component({
  selector: "app-add-information-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      (click)="onOverlayClick($event)"
    >
      <div
        class="bg-white rounded w-full max-w-[767px] max-h-[90vh] flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between px-[20px] py-[16px] flex-shrink-0"
        >
          <h2 class="text-[22px] font-medium text-[#3F4254]">
            {{ editMode ? "Edit Floor Plan" : "Add Floor Plan" }}
          </h2>
          <button
            (click)="onClose()"
            class="w-[18px] h-[18px] flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Close modal"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_437_8161)">
                <path
                  d="M0.929495 18C0.692391 18 0.455286 17.9099 0.275141 17.7284C-0.0865054 17.3667 -0.0865054 16.7804 0.275141 16.4187L16.4227 0.271235C16.7843 -0.0904116 17.3706 -0.0904116 17.7323 0.271235C18.0939 0.632881 18.0939 1.2192 17.7323 1.58107L1.58498 17.7284C1.40348 17.9087 1.16637 18 0.929495 18Z"
                  fill="#3F4254"
                />
                <path
                  d="M17.0781 18C16.841 18 16.6042 17.9099 16.4238 17.7284L0.275141 1.58107C-0.0865054 1.2192 -0.0865054 0.632881 0.275141 0.271235C0.636787 -0.0904116 1.22311 -0.0904116 1.58498 0.271235L17.7323 16.4187C18.0939 16.7804 18.0939 17.3667 17.7323 17.7284C17.5508 17.9087 17.3139 18 17.0781 18Z"
                  fill="#3F4254"
                />
              </g>
              <defs>
                <clipPath id="clip0_437_8161">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto px-[20px] pb-6">
          <div class="space-y-[30px]">
            <!-- Title and Floor Plan For Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-[31px]">
              <!-- Title Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Title</label
                >
                <input
                  type="text"
                  [(ngModel)]="formData.title"
                  placeholder="Enter Title"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base font-medium focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>

              <!-- Floor Plan For Field -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2"
                  >Floor Plan For</label
                >
                <div class="relative">
                  <select
                    [(ngModel)]="formData.floorPlanFor"
                    class="w-full h-[50px] px-5 pr-10 border-2 border-[#E9EBEC] rounded text-base appearance-none focus:outline-none focus:border-[#009FD8] transition-colors"
                    [class.text-[#C2C3CB]]="!formData.floorPlanFor"
                    [class.text-[#212529]]="formData.floorPlanFor"
                  >
                    <option value="" disabled selected hidden>
                      Please Select
                    </option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    <option value="both">Both</option>
                  </select>
                  <div
                    class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <svg
                      width="9"
                      height="5"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.19591 0.19323C8.45626 -0.0642735 8.87837 -0.0642735 9.13872 0.19323C9.39907 0.450734 9.39907 0.868231 9.13872 1.12574L5.13872 5.08202C4.88634 5.33165 4.47995 5.34038 4.21683 5.10183L0.216835 1.47524C-0.0545782 1.22916 -0.0729126 0.81206 0.175882 0.543613C0.424676 0.275167 0.846388 0.257032 1.1178 0.503108L4.64727 3.70309L8.19591 0.19323Z"
                        fill="#434349"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Type Radio Buttons -->
            <div class="flex items-center gap-[95px]">
              <label class="flex items-center gap-[10px] cursor-pointer group">
                <div class="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="type"
                    value="Standard"
                    [(ngModel)]="formData.type"
                    class="appearance-none w-5 h-5 border border-[#CED4DA] rounded-full bg-[#FEFEFE] cursor-pointer checked:border-[#CED4DA] peer"
                  />
                  <div
                    class="absolute w-2.5 h-2.5 rounded-full bg-[#049AD0] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  ></div>
                </div>
                <span class="text-base font-medium text-[#212529]"
                  >Standard</span
                >
              </label>
              <label class="flex items-center gap-[10px] cursor-pointer group">
                <div class="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="type"
                    value="External"
                    [(ngModel)]="formData.type"
                    class="appearance-none w-5 h-5 border border-[#CED4DA] rounded-full bg-[#FEFEFE] cursor-pointer checked:border-[#CED4DA] peer"
                  />
                  <div
                    class="absolute w-2.5 h-2.5 rounded-full bg-[#049AD0] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                  ></div>
                </div>
                <span class="text-base font-medium text-[#212529]"
                  >External</span
                >
              </label>
            </div>

            <!-- URL Field (shown only for External type) -->
            <div *ngIf="formData.type === 'External'">
              <label class="block text-base font-medium text-[#212529] mb-2"
                >URL</label
              >
              <input
                type="url"
                [(ngModel)]="formData.url"
                placeholder="Enter Location"
                class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
              />
            </div>

            <!-- Featured Images (shown only for Standard type) -->
            <div *ngIf="formData.type === 'Standard'">
              <div
                class="border border-dashed border-[#B9BBBC] rounded min-h-[120px] p-5 relative"
              >
                <div
                  *ngIf="featuredImages.length === 0"
                  class="flex flex-col items-center justify-center h-full cursor-pointer"
                  (click)="featuredImagesInput.click()"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mb-2"
                  >
                    <path
                      d="M25.0037 27.6419H19.8316H18.4389H18.1381V20.7045H20.407C20.9824 20.7045 21.3224 20.0506 20.9824 19.5798L16.5689 13.4727C16.2877 13.0804 15.7058 13.0804 15.4246 13.4727L11.011 19.5798C10.671 20.0506 11.0045 20.7045 11.5864 20.7045H13.8553V27.6419H13.5546H12.1618H6.16592C2.73314 27.4523 0 24.2418 0 20.7633C0 18.3636 1.30119 16.2713 3.23008 15.1401C3.05354 14.6628 2.96199 14.1528 2.96199 13.6166C2.96199 11.1646 4.9432 9.18341 7.39518 9.18341C7.92481 9.18341 8.43482 9.27495 8.91214 9.45149C10.331 6.44373 13.3911 4.35791 16.9481 4.35791C21.5513 4.36445 25.3437 7.88876 25.7752 12.3808C29.3126 12.9889 32 16.2647 32 19.9721C32 23.9345 28.9138 27.3673 25.0037 27.6419Z"
                      fill="#878A99"
                    />
                  </svg>
                  <p class="text-base font-medium text-[#212529]">
                    Drop Images here or click to upload.
                  </p>
                </div>

                <div
                  *ngIf="featuredImages.length > 0"
                  class="flex flex-wrap gap-3"
                >
                  <div
                    *ngFor="let image of featuredImages; let i = index"
                    class="relative w-20 h-20"
                  >
                    <img
                      [src]="image.preview"
                      [alt]="'Featured image ' + (i + 1)"
                      class="w-20 h-20 rounded object-cover border border-[#E9EBEC]"
                    />
                    <button
                      type="button"
                      (click)="removeFeaturedImage(i)"
                      class="absolute -top-[9px] -right-[9px] w-[18px] h-[18px] flex items-center justify-center"
                      aria-label="Remove image"
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style="filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.07))"
                      >
                        <circle cx="13" cy="13" r="9" fill="white" />
                        <circle cx="13" cy="13" r="8.5" stroke="#878A99" />
                        <path
                          d="M9.31048 16C9.23145 16 9.15241 15.9699 9.09236 15.9095C8.97182 15.7889 8.97182 15.5935 9.09236 15.4729L15.4749 9.09042C15.5954 8.96987 15.7909 8.96987 15.9114 9.09042C16.032 9.21096 16.032 9.4064 15.9114 9.52702L9.52898 15.9095C9.46848 15.9696 9.38945 16 9.31048 16Z"
                          fill="#686868"
                        />
                        <path
                          d="M15.6934 16C15.6143 16 15.5354 15.9699 15.4753 15.9095L9.09236 9.52702C8.97182 9.4064 8.97182 9.21096 9.09236 9.09042C9.21291 8.96987 9.40835 8.96987 9.52898 9.09042L15.9114 15.4729C16.032 15.5935 16.032 15.7889 15.9114 15.9095C15.8509 15.9696 15.772 16 15.6934 16Z"
                          fill="#686868"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <input
                  #featuredImagesInput
                  type="file"
                  accept="image/*"
                  multiple
                  class="hidden"
                  (change)="onFeaturedImagesSelected($event)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-end gap-4 px-[26px] py-5 flex-shrink-0"
        >
          <button
            (click)="onClose()"
            class="flex items-center gap-2 h-9 px-[17px] rounded bg-[#DEE1EB] text-[#4C546C] font-semibold text-base hover:bg-[#d0d3df] transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_437_8177)">
                <path
                  d="M0.620965 12C0.462896 12 0.304826 11.9399 0.184729 11.8189C-0.0563682 11.5778 -0.0563682 11.1869 0.184729 10.9458L10.9497 0.180823C11.1908 -0.0602744 11.5817 -0.0602744 11.8228 0.180823C12.0639 0.421921 12.0639 0.8128 11.8228 1.05405L1.05795 11.8189C0.936954 11.9392 0.778884 12 0.620965 12Z"
                  fill="#4C546C"
                />
                <path
                  d="M11.3867 12C11.2287 12 11.0707 11.9399 10.9505 11.8189L0.184729 1.05405C-0.0563682 0.8128 -0.0563682 0.421921 0.184729 0.180823C0.425827 -0.0602744 0.816707 -0.0602744 1.05795 0.180823L11.8228 10.9458C12.0639 11.1869 12.0639 11.5778 11.8228 11.8189C11.7018 11.9392 11.5439 12 11.3867 12Z"
                  fill="#4C546C"
                />
              </g>
              <defs>
                <clipPath id="clip0_437_8177">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Close</span>
          </button>
          <button
            (click)="onSave()"
            class="flex items-center gap-2 h-9 px-[18px] rounded bg-[#009FD8] text-white font-semibold text-base hover:bg-[#0385b5] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7432 3.76582C14.0231 4.01076 14.0485 4.43749 13.7995 4.71384L6.79025 12.4937C6.53996 12.7715 6.11021 12.7892 5.83796 12.5329L1.78194 8.7145C1.529 8.47637 1.50478 8.07957 1.7218 7.8083C1.96127 7.50897 2.40721 7.46777 2.6922 7.7241L5.83913 10.5547C6.11261 10.8007 6.53366 10.7787 6.78005 10.5056L12.8091 3.82096C13.053 3.55046 13.4691 3.52594 13.7432 3.76582Z"
                fill="white"
              />
            </svg>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class AddInformationModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() set informationData(data: any) {
    if (data) {
      this.formData = {
        title: data.title || "",
        floorPlanFor: data.floorPlanFor || "",
        type: data.type || "Standard",
        url: data.url || "",
        description: data.description || "",
      };
      this.featuredImages = data.featuredImages || [];
    }
  }
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData = {
    title: "",
    floorPlanFor: "",
    type: "Standard",
    url: "",
    description: "",
  };

  featuredImages: FeaturedImage[] = [];

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onSave() {
    if (this.validateForm()) {
      const saveData = {
        ...this.formData,
        featuredImages: this.featuredImages,
      };
      this.save.emit(saveData);
      this.resetForm();
    }
  }

  onOverlayClick(event: MouseEvent) {
    this.onClose();
  }

  onFeaturedImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.featuredImages.push({
            file: file,
            preview: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      });
      input.value = "";
    }
  }

  removeFeaturedImage(index: number) {
    this.featuredImages.splice(index, 1);
  }

  validateForm(): boolean {
    if (!this.formData.title.trim()) {
      alert("Please enter a title");
      return false;
    }
    if (!this.formData.floorPlanFor) {
      alert("Please select floor plan for");
      return false;
    }
    if (!this.formData.type) {
      alert("Please select a type");
      return false;
    }
    return true;
  }

  resetForm() {
    this.formData = {
      title: "",
      floorPlanFor: "",
      type: "Standard",
      url: "",
      description: "",
    };
    this.featuredImages = [];
  }
}
