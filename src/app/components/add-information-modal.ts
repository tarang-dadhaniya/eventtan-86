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
            Add Information
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
            <!-- Profile Image Upload -->
            <div class="flex justify-center">
              <div class="relative">
                <div
                  class="w-[120px] h-[120px] rounded-full border-2 border-[#8B8B8B] overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                  (click)="profileImageInput.click()"
                >
                  <img
                    *ngIf="profileImagePreview"
                    [src]="profileImagePreview"
                    alt="Profile"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    *ngIf="!profileImagePreview"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.5 10.5H41.925C41.235 9.06 39.75 8.25 38.25 8.25H21.75C20.25 8.25 18.765 9.06 18.075 10.5H10.5C8.295 10.5 6.5025 12.3 6.5025 14.505L6.5 45.495C6.5 47.7 8.295 49.5 10.5 49.5H49.5C51.705 49.5 53.5 47.7 53.5 45.495V14.505C53.5 12.3 51.705 10.5 49.5 10.5ZM30 41.25C23.925 41.25 19 36.315 19 30.24C19 24.165 23.925 19.23 30 19.23C36.075 19.23 41 24.165 41 30.24C41 36.315 36.075 41.25 30 41.25Z"
                      fill="#62768F"
                    />
                    <path
                      d="M30 23.25C26.13 23.25 23 26.38 23 30.25C23 34.12 26.13 37.25 30 37.25C33.87 37.25 37 34.12 37 30.25C37 26.38 33.87 23.25 30 23.25Z"
                      fill="#62768F"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#009FD8] flex items-center justify-center shadow-md hover:bg-[#0385b5] transition-colors"
                  (click)="profileImageInput.click()"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.42963 9.53695C2.31763 9.53695 2.20585 9.4943 2.12032 9.40877C1.94948 9.23792 1.94948 8.96098 2.12032 8.79014L8.95713 1.95333C9.12776 1.78248 9.40491 1.78248 9.57576 1.95333C9.7466 2.12417 9.7466 2.40111 9.57576 2.57195L2.73895 9.40877C2.65363 9.49408 2.54163 9.53695 2.42963 9.53695Z" fill="white"/>
                    <path d="M1.75434 12.6874C1.72394 12.6874 1.69309 12.6841 1.66225 12.6775C1.426 12.6268 1.2755 12.3942 1.32625 12.158L2.00219 9.00733C2.05294 8.77108 2.28656 8.62102 2.52172 8.67133C2.75797 8.72208 2.90847 8.95462 2.85772 9.19087L2.18178 12.3415C2.13781 12.5469 1.95625 12.6874 1.75434 12.6874Z" fill="white"/>
                    <path d="M4.90424 12.0113C4.79224 12.0113 4.68046 11.9687 4.59493 11.8832C4.42409 11.7123 4.42409 11.4354 4.59493 11.2645L11.4317 4.42794C11.6024 4.25709 11.8795 4.25709 12.0504 4.42794C12.2212 4.59878 12.2212 4.87572 12.0504 5.04656L5.21377 11.8832C5.12824 11.9687 5.01624 12.0113 4.90424 12.0113Z" fill="white"/>
                    <path d="M1.75362 12.6877C1.55172 12.6877 1.37037 12.5472 1.32618 12.3418C1.27565 12.1056 1.42593 11.873 1.66218 11.8223L4.81284 11.1464C5.04931 11.0963 5.28184 11.2463 5.33237 11.4824C5.3829 11.7186 5.23262 11.9511 4.99637 12.0019L1.84572 12.6778C1.81487 12.6846 1.78403 12.6877 1.75362 12.6877Z" fill="white"/>
                    <path d="M10.504 6.41216C10.392 6.41216 10.28 6.36951 10.1946 6.28398L7.71993 3.80926C7.54909 3.63841 7.54909 3.36148 7.71993 3.19063C7.89055 3.01979 8.16793 3.01979 8.33856 3.19063L10.8133 5.66535C10.9841 5.8362 10.9841 6.11313 10.8133 6.28398C10.728 6.36951 10.616 6.41216 10.504 6.41216Z" fill="white"/>
                    <path d="M11.7407 5.17502C11.6287 5.17502 11.5167 5.13237 11.4312 5.04684C11.2604 4.87599 11.2604 4.59905 11.4312 4.42799C11.6747 4.18452 11.8088 3.85487 11.8088 3.50005C11.8088 3.14524 11.6747 2.81559 11.4312 2.57212C11.1875 2.32843 10.8579 2.19434 10.503 2.19434C10.1482 2.19434 9.81857 2.32843 9.5751 2.57212C9.40448 2.74296 9.12754 2.74318 8.95626 2.57212C8.78541 2.40127 8.78541 2.12434 8.95626 1.95327C9.36488 1.54443 9.91416 1.31934 10.503 1.31934C11.0917 1.31934 11.6412 1.54443 12.0498 1.95327C12.4587 2.3619 12.6838 2.91118 12.6838 3.50005C12.6838 4.08893 12.4587 4.63821 12.0498 5.04684C11.9647 5.13215 11.8527 5.17502 11.7407 5.17502Z" fill="white"/>
                  </svg>
                </button>
                <input
                  #profileImageInput
                  type="file"
                  accept="image/*"
                  class="hidden"
                  (change)="onProfileImageSelected($event)"
                />
              </div>
            </div>

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

            <!-- Description Field (shown only for Standard type) -->
            <div *ngIf="formData.type === 'Standard'">
              <label class="block text-base font-medium text-[#212529] mb-2"
                >Description</label
              >

              <!-- Rich Text Editor Toolbar -->
              <div class="border border-[#CED4DA] rounded">
                <div
                  class="flex items-center gap-2 px-2 py-[10px] border-b border-[#CED4DA] bg-white rounded-t flex-wrap"
                >
                  <!-- Format buttons -->
                  <div class="flex items-center gap-0.5">
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Undo"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 6.25H4.88438L7.12625 4.00875L6.25 3.125L2.5 6.875L6.25 10.625L7.12625 9.74062L4.88625 7.5H12.5C13.4946 7.5 14.4484 7.89509 15.1517 8.59835C15.8549 9.30161 16.25 10.2554 16.25 11.25C16.25 12.2446 15.8549 13.1984 15.1517 13.9017C14.4484 14.6049 13.4946 15 12.5 15H7.5V16.25H12.5C13.8261 16.25 15.0979 15.7232 16.0355 14.7855C16.9732 13.8479 17.5 12.5761 17.5 11.25C17.5 9.92392 16.9732 8.65215 16.0355 7.71447C15.0979 6.77678 13.8261 6.25 12.5 6.25Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Redo"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 6.25H15.1156L12.8737 4.00875L13.75 3.125L17.5 6.875L13.75 10.625L12.8737 9.74062L15.1137 7.5H7.5C6.50544 7.5 5.55161 7.89509 4.84835 8.59835C4.14509 9.30161 3.75 10.2554 3.75 11.25C3.75 12.2446 4.14509 13.1984 4.84835 13.9017C5.55161 14.6049 6.50544 15 7.5 15H12.5V16.25H7.5C6.17392 16.25 4.90215 15.7232 3.96447 14.7855C3.02678 13.8479 2.5 12.5761 2.5 11.25C2.5 9.92392 3.02678 8.65215 3.96447 7.71447C4.90215 6.77678 6.17392 6.25 7.5 6.25Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="flex items-center gap-1 px-2 h-7 hover:bg-gray-100 rounded text-sm"
                    >
                      <span class="text-[#212529] font-normal"
                        >Normal text</span
                      >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 11L3 6.00005L3.7 5.30005L8 9.60005L12.3 5.30005L13 6.00005L8 11Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="flex items-center gap-0.5 px-2 h-7 hover:bg-gray-100 rounded"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 3.75H16.25V5H7.5V3.75ZM7.5 7.5H13.75V8.75H7.5V7.5ZM7.5 11.25H16.25V12.5H7.5V11.25ZM7.5 15H13.75V16.25H7.5V15ZM3.75 2.5H5V17.5H3.75V2.5Z"
                          fill="#212529"
                        />
                      </svg>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 11L3 6.00005L3.7 5.30005L8 9.60005L12.3 5.30005L13 6.00005L8 11Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="flex items-center gap-0.5 px-2 h-7 hover:bg-gray-100 rounded"
                    >
                      <div
                        class="w-5 h-5 rounded bg-[#212529] border border-[#212529] opacity-70"
                      ></div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 11L3 6.00005L3.7 5.30005L8 9.60005L12.3 5.30005L13 6.00005L8 11Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Bold"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4062 15.625H5.625V4.375H10.9375C11.5639 4.37504 12.1771 4.55435 12.7048 4.89174C13.2325 5.22914 13.6526 5.71052 13.9155 6.27903C14.1784 6.84754 14.2731 7.47942 14.1884 8.10001C14.1037 8.72061 13.8431 9.30399 13.4375 9.78125C13.9673 10.205 14.3528 10.7825 14.5408 11.4344C14.7289 12.0862 14.7102 12.7803 14.4875 13.4211C14.2647 14.0619 13.8488 14.6179 13.297 15.0126C12.7452 15.4073 12.0847 15.6213 11.4062 15.625ZM7.5 13.75H11.3937C11.5784 13.75 11.7613 13.7136 11.9319 13.643C12.1025 13.5723 12.2575 13.4687 12.3881 13.3381C12.5187 13.2075 12.6223 13.0525 12.693 12.8819C12.7636 12.7113 12.8 12.5284 12.8 12.3438C12.8 12.1591 12.7636 11.9762 12.693 11.8056C12.6223 11.635 12.5187 11.48 12.3881 11.3494C12.2575 11.2188 12.1025 11.1152 11.9319 11.0445C11.7613 10.9739 11.5784 10.9375 11.3937 10.9375H7.5V13.75ZM7.5 9.0625H10.9375C11.1222 9.0625 11.305 9.02613 11.4756 8.95546C11.6463 8.88478 11.8013 8.7812 11.9319 8.65062C12.0625 8.52004 12.166 8.36501 12.2367 8.1944C12.3074 8.02378 12.3438 7.84092 12.3438 7.65625C12.3438 7.47158 12.3074 7.28872 12.2367 7.1181C12.166 6.94749 12.0625 6.79246 11.9319 6.66188C11.8013 6.5313 11.6463 6.42772 11.4756 6.35704C11.305 6.28637 11.1222 6.25 10.9375 6.25H7.5V9.0625Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Italic"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.625 5.625V4.375H7.5V5.625H10.7125L7.98125 14.375H4.375V15.625H12.5V14.375H9.2875L12.0187 5.625H15.625Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Underline"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 16.25H17.5V17.5H2.5V16.25ZM10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10V3.125H6.875V10C6.875 10.8288 7.20424 11.6237 7.79029 12.2097C8.37634 12.7958 9.1712 13.125 10 13.125C10.8288 13.125 11.6237 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10V3.125H14.375V10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Strikethrough"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 9.37489H11.2225C10.945 9.30027 10.6662 9.23047 10.3863 9.16552C8.63125 8.75052 7.63875 8.44677 7.63875 7.02614C7.6245 6.7809 7.66081 6.53535 7.74542 6.30473C7.83004 6.07411 7.96115 5.86335 8.13062 5.68552C8.6615 5.24896 9.32644 5.0084 10.0137 5.00427C11.7825 4.96052 12.5981 5.56052 13.265 6.47302L14.2744 5.73552C13.8019 5.05699 13.1578 4.51605 12.4078 4.16796C11.6578 3.81987 10.8288 3.67711 10.0056 3.75427C8.99439 3.76072 8.01887 4.12898 7.25563 4.79239C6.96634 5.08583 6.74024 5.43541 6.59125 5.81959C6.44227 6.20377 6.37356 6.61439 6.38937 7.02614C6.36197 7.4767 6.4466 7.92702 6.63572 8.33688C6.82483 8.74674 7.11254 9.10337 7.47312 9.37489H2.5V10.6249H11.0325C12.2619 10.9811 12.9969 11.4449 13.0156 12.7236C13.0359 12.9968 12.9985 13.2712 12.9056 13.5289C12.8128 13.7866 12.6667 14.0218 12.4769 14.2193C11.8155 14.7406 10.9938 15.0165 10.1519 14.9999C9.52345 14.9817 8.90738 14.8208 8.35029 14.5294C7.7932 14.2381 7.30966 13.8238 6.93625 13.318L5.97812 14.1205C6.46358 14.7675 7.08994 15.2954 7.80972 15.6643C8.52951 16.0333 9.32384 16.2335 10.1325 16.2499H10.195C11.3492 16.2632 12.4695 15.8595 13.35 15.113C13.6625 14.7979 13.9054 14.4208 14.0632 14.006C14.2209 13.5913 14.2898 13.148 14.2656 12.7049C14.289 11.9469 14.0332 11.2068 13.5469 10.6249H17.5V9.37489Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Inline code"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.375 10L15 14.375L14.1187 13.4938L17.6063 10L14.1187 6.50625L15 5.625L19.375 10ZM0.625 10L5 5.625L5.88125 6.50625L2.39375 10L5.88125 13.4938L5 14.375L0.625 10Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Clear format"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.3988 10.3575L13.4081 5.36625C13.1736 5.13187 12.8556 5.00021 12.5241 5.00021C12.1925 5.00021 11.8745 5.13187 11.64 5.36625L8.29125 8.715L5.625 1.25H4.375L1.25 10H2.5L3.12438 8.125H6.87437L7.37625 9.63L2.86625 14.14C2.75012 14.2561 2.658 14.3939 2.59515 14.5456C2.5323 14.6973 2.49995 14.8599 2.49995 15.0241C2.49995 15.1883 2.5323 15.3508 2.59515 15.5025C2.658 15.6542 2.75012 15.792 2.86625 15.9081L5.7075 18.75H11.7013L18.3988 12.0519C18.5101 11.9406 18.5984 11.8085 18.6587 11.6631C18.719 11.5177 18.75 11.3618 18.75 11.2044C18.75 11.047 18.719 10.8911 18.6587 10.7457C18.5984 10.6003 18.5101 10.4681 18.3988 10.3569V10.3575ZM3.54063 6.875L4.9975 2.5L6.4575 6.875H3.54063ZM11.1844 17.5H6.225L3.75 15.0238L7.695 11.0794L12.65 16.0337L11.1844 17.5ZM13.5344 15.15L8.57938 10.1956L12.5244 6.25L17.4788 11.2044L13.5344 15.15Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Bulleted list"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.375 7.5C5.41053 7.5 6.25 6.66053 6.25 5.625C6.25 4.58947 5.41053 3.75 4.375 3.75C3.33947 3.75 2.5 4.58947 2.5 5.625C2.5 6.66053 3.33947 7.5 4.375 7.5Z"
                          fill="#212529"
                        />
                        <path
                          d="M4.375 16.25C5.41053 16.25 6.25 15.4105 6.25 14.375C6.25 13.3395 5.41053 12.5 4.375 12.5C3.33947 12.5 2.5 13.3395 2.5 14.375C2.5 15.4105 3.33947 16.25 4.375 16.25Z"
                          fill="#212529"
                        />
                        <path
                          d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Numbered list"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5ZM5 7.5V2.5H3.75V3.125H2.5V4.375H3.75V7.5H2.5V8.75H6.25V7.5H5ZM6.25 17.5H2.5V15C2.5 14.6685 2.6317 14.3505 2.86612 14.1161C3.10054 13.8817 3.41848 13.75 3.75 13.75H5V12.5H2.5V11.25H5C5.33152 11.25 5.64946 11.3817 5.88388 11.6161C6.1183 11.8505 6.25 12.1685 6.25 12.5V13.75C6.25 14.0815 6.1183 14.3995 5.88388 14.6339C5.64946 14.8683 5.33152 15 5 15H3.75V16.25H6.25V17.5Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Link"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2803 4.22503C17.9319 3.87543 17.518 3.59804 17.0621 3.40877C16.6063 3.2195 16.1176 3.12207 15.6241 3.12207C15.1305 3.12207 14.6418 3.2195 14.186 3.40877C13.7302 3.59804 13.3162 3.87543 12.9678 4.22503L13.8553 5.11253C14.088 4.87984 14.3642 4.69526 14.6683 4.56934C14.9723 4.44341 15.2981 4.37859 15.6272 4.37859C15.9563 4.37859 16.2821 4.44341 16.5861 4.56934C16.8901 4.69526 17.1664 4.87984 17.3991 5.11253C17.6318 5.34521 17.8163 5.62145 17.9423 5.92547C18.0682 6.22949 18.133 6.55533 18.133 6.8844C18.133 7.21347 18.0682 7.53931 17.9423 7.84333C17.8163 8.14735 17.6318 8.42359 17.3991 8.65628L12.3991 13.6563C11.93 14.1262 11.2934 14.3905 10.6294 14.3911C9.9654 14.3917 9.32837 14.1285 8.85844 13.6594C8.38851 13.1903 8.12418 12.5537 8.12359 11.8897C8.123 11.2257 8.38621 10.5887 8.85532 10.1188L9.73657 9.23128L8.85532 8.34378L7.96782 9.23128C7.61822 9.57966 7.34083 9.99364 7.15156 10.4495C6.96229 10.9053 6.86486 11.394 6.86486 11.8875C6.86486 12.3811 6.96229 12.8698 7.15156 13.3256C7.34083 13.7814 7.61822 14.1954 7.96782 14.5438C8.675 15.2419 9.63036 15.6308 10.6241 15.625C11.1195 15.6271 11.6105 15.5309 12.0685 15.3421C12.5266 15.1533 12.9427 14.8756 13.2928 14.525L18.2928 9.52503C18.9934 8.82025 19.3856 7.86619 19.3833 6.87244C19.3809 5.87869 18.9842 4.9265 18.2803 4.22503Z"
                          fill="#212529"
                        />
                        <path
                          d="M2.61782 15.5125C2.38444 15.2802 2.19925 15.0041 2.07288 14.7C1.94652 14.396 1.88146 14.0699 1.88146 13.7407C1.88146 13.4114 1.94652 13.0853 2.07288 12.7813C2.19925 12.4772 2.38444 12.2011 2.61782 11.9688L7.61782 6.96878C7.85011 6.7354 8.12622 6.55021 8.4303 6.42384C8.73437 6.29748 9.06041 6.23243 9.38969 6.23243C9.71897 6.23243 10.045 6.29748 10.3491 6.42384C10.6532 6.55021 10.9293 6.7354 11.1616 6.96878C11.3935 7.2029 11.576 7.48119 11.6984 7.78716C11.8208 8.09313 11.8805 8.42055 11.8741 8.75003C11.876 9.08053 11.8123 9.40813 11.6868 9.71388C11.5613 10.0196 11.3764 10.2974 11.1428 10.5313L9.81782 11.875L10.7053 12.7625L12.0303 11.4375C12.7356 10.7322 13.1319 9.77561 13.1319 8.77815C13.1319 7.78069 12.7356 6.82409 12.0303 6.11878C11.325 5.41347 10.3684 5.01723 9.37094 5.01723C8.37348 5.01723 7.41688 5.41347 6.71157 6.11878L1.71157 11.1188C1.36103 11.4673 1.08284 11.8816 0.893018 12.338C0.703192 12.7944 0.605469 13.2839 0.605469 13.7782C0.605469 14.2725 0.703192 14.7619 0.893018 15.2183C1.08284 15.6747 1.36103 16.089 1.71157 16.4375C2.42333 17.1303 3.38088 17.5124 4.37407 17.5C5.376 17.501 6.33764 17.1055 7.04907 16.4L6.16157 15.5125C5.92927 15.7459 5.65316 15.9311 5.34909 16.0575C5.04501 16.1838 4.71897 16.2489 4.38969 16.2489C4.06041 16.2489 3.73437 16.1838 3.4303 16.0575C3.12622 15.9311 2.85011 15.7459 2.61782 15.5125Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Image"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.875 8.75C12.2458 8.75 12.6084 8.64003 12.9167 8.43401C13.225 8.22798 13.4654 7.93514 13.6073 7.59253C13.7492 7.24992 13.7863 6.87292 13.714 6.50921C13.6416 6.14549 13.463 5.8114 13.2008 5.54917C12.9386 5.28695 12.6045 5.10837 12.2408 5.03603C11.8771 4.96368 11.5001 5.00081 11.1575 5.14273C10.8149 5.28464 10.522 5.52496 10.316 5.83331C10.11 6.14165 10 6.50416 10 6.875C10 7.37228 10.1975 7.84919 10.5492 8.20083C10.9008 8.55246 11.3777 8.75 11.875 8.75ZM11.875 6.25C11.9986 6.25 12.1195 6.28666 12.2222 6.35533C12.325 6.42401 12.4051 6.52162 12.4524 6.63582C12.4997 6.75003 12.5121 6.87569 12.488 6.99693C12.4639 7.11817 12.4044 7.22953 12.3169 7.31694C12.2295 7.40435 12.1182 7.46388 11.9969 7.48799C11.8757 7.51211 11.75 7.49973 11.6358 7.45243C11.5216 7.40512 11.424 7.32501 11.3553 7.22223C11.2867 7.11945 11.25 6.99861 11.25 6.875C11.25 6.70924 11.3158 6.55027 11.4331 6.43306C11.5503 6.31585 11.7092 6.25 11.875 6.25Z"
                          fill="#212529"
                        />
                        <path
                          d="M16.25 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM16.25 16.25H3.75V12.5L6.875 9.375L10.3688 12.8687C10.603 13.1016 10.9198 13.2322 11.25 13.2322C11.5802 13.2322 11.897 13.1016 12.1313 12.8687L13.125 11.875L16.25 15V16.25ZM16.25 13.2312L14.0063 10.9875C13.772 10.7547 13.4552 10.624 13.125 10.624C12.7948 10.624 12.478 10.7547 12.2437 10.9875L11.25 11.9812L7.75625 8.4875C7.52205 8.25469 7.20523 8.12401 6.875 8.12401C6.54477 8.12401 6.22795 8.25469 5.99375 8.4875L3.75 10.7312V3.75H16.25V13.2312Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Code block"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.375 10L15 14.375L14.1187 13.4937L17.6063 10L14.1187 6.50625L15 5.625L19.375 10ZM0.625 10L5 5.625L5.88125 6.50625L2.39375 10L5.88125 13.4937L5 14.375L0.625 10ZM7.7625 15.9275L11.025 3.75L12.2325 4.07313L8.97 16.25L7.7625 15.9275Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Quote"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 9.375H3.81875C3.93491 8.60146 4.21112 7.86066 4.62974 7.1999C5.04837 6.53914 5.6002 5.97295 6.25 5.5375L7.36875 4.7875L6.68125 3.75L5.5625 4.5C4.6208 5.12755 3.84857 5.97785 3.31433 6.97545C2.7801 7.97305 2.50038 9.08711 2.5 10.2188V14.375C2.5 14.7065 2.6317 15.0245 2.86612 15.2589C3.10054 15.4933 3.41848 15.625 3.75 15.625H7.5C7.83152 15.625 8.14946 15.4933 8.38388 15.2589C8.6183 15.0245 8.75 14.7065 8.75 14.375V10.625C8.75 10.2935 8.6183 9.97554 8.38388 9.74112C8.14946 9.5067 7.83152 9.375 7.5 9.375ZM16.25 9.375H12.5688C12.6849 8.60146 12.9611 7.86066 13.3797 7.1999C13.7984 6.53914 14.3502 5.97295 15 5.5375L16.1188 4.7875L15.4375 3.75L14.3125 4.5C13.3708 5.12755 12.5986 5.97785 12.0643 6.97545C11.5301 7.97305 11.2504 9.08711 11.25 10.2188V14.375C11.25 14.7065 11.3817 15.0245 11.6161 15.2589C11.8505 15.4933 12.1685 15.625 12.5 15.625H16.25C16.5815 15.625 16.8995 15.4933 17.1339 15.2589C17.3683 15.0245 17.5 14.7065 17.5 14.375V10.625C17.5 10.2935 17.3683 9.97554 17.1339 9.74112C16.8995 9.5067 16.5815 9.375 16.25 9.375Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Horizontal rule"
                    >
                      <div class="w-5 h-5 flex items-center justify-center">
                        <div class="w-[15px] h-[1px] bg-[#212529]"></div>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Text area -->
                <textarea
                  [(ngModel)]="formData.description"
                  rows="6"
                  placeholder=""
                  class="w-full px-4 py-3 border-0 rounded-b placeholder:text-[#C2C3CB] text-base focus:outline-none resize-none"
                ></textarea>
              </div>
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

            <!-- Featured Images -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-[7px]"
                >Featured Images</label
              >
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
                        <circle cx="13" cy="13" r="9" fill="white"/>
                        <circle cx="13" cy="13" r="8.5" stroke="#878A99"/>
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
        profileImage: data.profileImage || "",
      };
      this.profileImagePreview = data.profileImage || "";
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
    profileImage: "",
  };

  profileImagePreview: string = "";
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

  onProfileImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.formData.profileImage = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
      input.value = '';
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
      profileImage: "",
    };
    this.profileImagePreview = "";
    this.featuredImages = [];
  }
}
