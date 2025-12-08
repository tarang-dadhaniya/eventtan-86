import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-sponsors-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      (click)="onCancel()"
    >
      <div
        class="bg-white rounded shadow-lg w-full max-w-[767px] max-h-[95vh] flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <div class="flex-shrink-0 px-[30px] py-[30px]">
          <div class="flex items-center justify-between">
            <h2 class="text-[22px] font-medium text-[#3F4254]">Add Sponsors</h2>
            <button
              type="button"
              (click)="onCancel()"
              class="text-[#3F4254] hover:text-[#212529] transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M0.929495 18C0.692391 18 0.455286 17.9099 0.275141 17.7284C-0.0865054 17.3667 -0.0865054 16.7804 0.275141 16.4187L16.4227 0.271235C16.7843 -0.0904116 17.3706 -0.0904116 17.7323 0.271235C18.0939 0.632881 18.0939 1.2192 17.7323 1.58107L1.58498 17.7284C1.40348 17.9087 1.16637 18 0.929495 18Z"
                    fill="currentColor"
                  />
                  <path
                    d="M17.0781 18C16.841 18 16.6042 17.9099 16.4238 17.7284L0.275141 1.58107C-0.0865054 1.2192 -0.0865054 0.632881 0.275141 0.271235C0.636787 -0.0904116 1.22311 -0.0904116 1.58498 0.271235L17.7323 16.4187C18.0939 16.7804 18.0939 17.3667 17.7323 17.7284C17.5508 17.9087 17.3139 18 17.0781 18Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        <form class="flex-1 flex flex-col min-h-0" (ngSubmit)="onSubmit()">
          <div class="flex-1 overflow-y-auto px-[25px] pb-6 min-h-0">
            <div class="flex justify-center mb-8">
              <div class="relative">
                <div
                  class="w-[100px] h-[100px] rounded-full border-2 border-[#8B8B8B] bg-[#F5F5F5] flex items-center justify-center overflow-hidden cursor-pointer"
                  (click)="logoInput.click()"
                >
                  <img
                    *ngIf="formData.companyLogo"
                    [src]="formData.companyLogo"
                    alt="Company Logo"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    *ngIf="!formData.companyLogo"
                    width="60"
                    height="60"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="15"
                      y="25"
                      width="70"
                      height="55"
                      rx="6"
                      fill="#5B7285"
                    />
                    <rect
                      x="35"
                      y="15"
                      width="30"
                      height="20"
                      rx="3"
                      fill="#5B7285"
                    />
                    <rect
                      x="70"
                      y="28"
                      width="12"
                      height="10"
                      rx="2"
                      fill="#6FB3A5"
                    />
                    <circle
                      cx="50"
                      cy="52"
                      r="12"
                      fill="none"
                      stroke="white"
                      stroke-width="3"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  (click)="logoInput.click()"
                  class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#009FD8] flex items-center justify-center shadow-md hover:bg-[#0385b5] transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8333 3.16667L16.8333 2.16667C17.5 1.5 18.5833 1.5 19.25 2.16667C19.9167 2.83333 19.9167 3.91667 19.25 4.58333L18.25 5.58333"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.33333 16.6667H2V18C2 18.5523 2.44772 19 3 19H4.33333V17.6667"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.25 5.58333L5.5 18.3333C5.03333 18.8 4.33333 19 3.5 19H2V17.5C2 16.6667 2.2 15.9667 2.66667 15.5L15.4167 2.75"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <input
                #logoInput
                type="file"
                accept="image/*"
                class="hidden"
                (change)="onLogoChange($event)"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.companyName"
                  name="companyName"
                  placeholder="Enter Company Name"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  required
                />
              </div>

              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Track
                </label>
                <div class="relative">
                  <select
                    [(ngModel)]="formData.track"
                    name="track"
                    class="w-full h-[50px] px-5 pr-10 border-2 border-[#E9EBEC] rounded text-base focus:outline-none focus:border-[#009FD8] appearance-none bg-white transition-colors"
                    [ngClass]="{
                      'text-[#C2C3CB]': !formData.track,
                      'text-[#212529]': formData.track,
                    }"
                    required
                  >
                    <option value="" disabled>Please Select</option>
                    <option value="Gold Sponsors">Gold Sponsors</option>
                    <option value="Silver Sponsors">Silver Sponsors</option>
                    <option value="Bronze Sponsors">Bronze Sponsors</option>
                    <option value="Organized By">Organized By</option>
                    <option value="Co-Organized">Co-Organized</option>
                  </select>
                  <svg
                    class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.31068 0.193108C8.57471 -0.0643956 9.00279 -0.0643956 9.26682 0.193108C9.53085 0.450612 9.53085 0.868109 9.26682 1.12561L5.21024 5.0819C4.95429 5.33152 4.54215 5.34026 4.27532 5.10171L0.218738 1.47512C-0.0565142 1.22904 -0.075108 0.811938 0.177206 0.543491C0.42952 0.275045 0.857196 0.25691 1.13245 0.502986L4.71184 3.70297L8.31068 0.193108Z"
                      fill="#434349"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  [(ngModel)]="formData.phone"
                  name="phone"
                  placeholder="Phone"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  required
                />
              </div>

              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  placeholder="Enter Email"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Social Media
                </label>
                <div class="relative">
                  <button
                    type="button"
                    (click)="toggleSocialMediaDropdown()"
                    class="w-full h-[50px] px-4 border-2 border-[#E9EBEC] rounded text-[#C2C3CB] text-base text-left focus:outline-none focus:border-[#009FD8] transition-colors bg-white"
                    [class.rounded-b-none]="showSocialMediaDropdown"
                  >
                    Please Select
                  </button>
                  <svg
                    class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.31068 0.193108C8.57471 -0.0643956 9.00279 -0.0643956 9.26682 0.193108C9.53085 0.450612 9.53085 0.868109 9.26682 1.12561L5.21024 5.0819C4.95429 5.33152 4.54215 5.34026 4.27532 5.10171L0.218738 1.47512C-0.0565142 1.22904 -0.075108 0.811938 0.177206 0.543491C0.42952 0.275045 0.857196 0.25691 1.13245 0.502986L4.71184 3.70297L8.31068 0.193108Z"
                      fill="#434349"
                    />
                  </svg>
                </div>
                <div
                  *ngIf="showSocialMediaDropdown"
                  class="border-2 border-t-0 border-[#E9EBEC] rounded-b px-4 py-3 space-y-3 bg-white"
                >
                  <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative w-5 h-5">
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.blogRss"
                        name="blogRss"
                        class="w-5 h-5 rounded border-2 border-[#BFC3C5] appearance-none checked:bg-[#009FD8] checked:border-[#009FD8] cursor-pointer"
                      />
                      <svg
                        *ngIf="formData.socialMedia.blogRss"
                        class="absolute top-0.5 left-0.5 pointer-events-none"
                        width="14"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.193 3.29512C12.4414 3.50945 12.4639 3.88283 12.243 4.12464L6.02312 10.932C5.80101 11.1751 5.41966 11.1906 5.17808 10.9663L1.57886 7.62522C1.3544 7.41685 1.33292 7.06965 1.5255 6.8323C1.73799 6.57038 2.13371 6.53433 2.38661 6.75862L5.17911 9.2354C5.42179 9.45065 5.79542 9.4314 6.01406 9.1924L11.3641 3.34337C11.5805 3.10668 11.9497 3.08522 12.193 3.29512Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="text-base text-black">Blog/Rss</span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative w-5 h-5">
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.facebook"
                        name="facebook"
                        class="w-5 h-5 rounded border-2 border-[#BFC3C5] appearance-none checked:bg-[#009FD8] checked:border-[#009FD8] cursor-pointer"
                      />
                      <svg
                        *ngIf="formData.socialMedia.facebook"
                        class="absolute top-0.5 left-0.5 pointer-events-none"
                        width="14"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.193 3.29512C12.4414 3.50945 12.4639 3.88283 12.243 4.12464L6.02312 10.932C5.80101 11.1751 5.41966 11.1906 5.17808 10.9663L1.57886 7.62522C1.3544 7.41685 1.33292 7.06965 1.5255 6.8323C1.73799 6.57038 2.13371 6.53433 2.38661 6.75862L5.17911 9.2354C5.42179 9.45065 5.79542 9.4314 6.01406 9.1924L11.3641 3.34337C11.5805 3.10668 11.9497 3.08522 12.193 3.29512Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="text-base text-black">Facebook</span>
                  </label>

                  <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative w-5 h-5">
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.twitter"
                        name="twitter"
                        class="w-5 h-5 rounded border-2 border-[#BFC3C5] appearance-none checked:bg-[#009FD8] checked:border-[#009FD8] cursor-pointer"
                      />
                      <svg
                        *ngIf="formData.socialMedia.twitter"
                        class="absolute top-0.5 left-0.5 pointer-events-none"
                        width="14"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.193 3.29512C12.4414 3.50945 12.4639 3.88283 12.243 4.12464L6.02312 10.932C5.80101 11.1751 5.41966 11.1906 5.17808 10.9663L1.57886 7.62522C1.3544 7.41685 1.33292 7.06965 1.5255 6.8323C1.73799 6.57038 2.13371 6.53433 2.38661 6.75862L5.17911 9.2354C5.42179 9.45065 5.79542 9.4314 6.01406 9.1924L11.3641 3.34337C11.5805 3.10668 11.9497 3.08522 12.193 3.29512Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="text-base text-black">Twitter</span>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Sponsors For
                </label>
                <div class="relative">
                  <select
                    [(ngModel)]="formData.sponsorsFor"
                    name="sponsorsFor"
                    class="w-full h-[50px] px-5 pr-10 border-2 border-[#E9EBEC] rounded text-base focus:outline-none focus:border-[#009FD8] appearance-none bg-white transition-colors"
                    [ngClass]="{
                      'text-[#C2C3CB]': !formData.sponsorsFor,
                      'text-[#212529]': formData.sponsorsFor,
                    }"
                  >
                    <option value="" disabled>Please Select</option>
                    <option value="Main Event">Main Event</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Conference">Conference</option>
                    <option value="Networking">Networking</option>
                  </select>
                  <svg
                    class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.31068 0.193108C8.57471 -0.0643956 9.00279 -0.0643956 9.26682 0.193108C9.53085 0.450612 9.53085 0.868109 9.26682 1.12561L5.21024 5.0819C4.95429 5.33152 4.54215 5.34026 4.27532 5.10171L0.218738 1.47512C-0.0565142 1.22904 -0.075108 0.811938 0.177206 0.543491C0.42952 0.275045 0.857196 0.25691 1.13245 0.502986L4.71184 3.70297L8.31068 0.193108Z"
                      fill="#434349"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              *ngIf="
                formData.socialMedia.blogRss || formData.socialMedia.facebook
              "
              class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
            >
              <div *ngIf="formData.socialMedia.blogRss">
                <div class="relative">
                  <div
                    class="absolute left-0 top-0 w-[50px] h-[50px] bg-[#F5F5F5] rounded-l flex items-center justify-center"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_rss)">
                        <path
                          d="M3.09074 15.8186C1.38647 15.8186 0 17.2051 0 18.9093C0 20.6135 1.38652 22 3.09074 22C4.79497 22 6.18144 20.6135 6.18144 18.9093C6.18144 17.2051 4.79493 15.8186 3.09074 15.8186ZM3.09074 20.7032C2.10152 20.7032 1.2968 19.8984 1.2968 18.9093C1.2968 17.9201 2.1016 17.1154 3.09074 17.1154C4.07984 17.1154 4.88464 17.9201 4.88464 18.9093C4.8846 19.8984 4.07988 20.7032 3.09074 20.7032Z"
                          fill="#353846"
                        />
                        <path
                          d="M14.8538 20.0612C14.2232 16.8822 12.6741 13.9813 10.3742 11.6721C8.05793 9.34652 5.14108 7.78138 1.93905 7.14601C1.46021 7.051 0.969375 7.17402 0.592238 7.48361C0.215832 7.79256 0 8.24906 0 8.73602V10.3368C0 11.1014 0.521512 11.7518 1.26827 11.9184C3.41924 12.3989 5.3845 13.4811 6.95157 15.0481C8.51903 16.6157 9.60128 18.5808 10.0813 20.7312C10.248 21.4781 10.8985 21.9997 11.663 21.9997H13.2637C13.7506 21.9997 14.2071 21.7838 14.5161 21.4075C14.8257 21.0305 14.9487 20.5399 14.8538 20.0612Z"
                          fill="#353846"
                        />
                      </g>
                    </svg>
                  </div>
                  <input
                    type="url"
                    [(ngModel)]="formData.socialMediaUrls.blogRss"
                    name="blogRssUrl"
                    placeholder="Enter Blog/Rss URL"
                    class="w-full h-[50px] pl-[70px] pr-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>
              </div>

              <div *ngIf="formData.socialMedia.facebook">
                <div class="relative">
                  <div
                    class="absolute left-0 top-0 w-[50px] h-[50px] bg-[#F5F5F5] rounded-l flex items-center justify-center"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_fb)">
                        <path
                          d="M12.4858 21.957H8.9558C8.36618 21.957 7.88654 21.4783 7.88654 20.8899V12.9433H5.82707C5.23745 12.9433 4.75781 12.4645 4.75781 11.8762V8.47106C4.75781 7.88259 5.23745 7.40389 5.82707 7.40389H7.88654V5.69873C7.88654 4.00801 8.41848 2.56957 9.42467 1.53915C10.4354 0.504044 11.8479 -0.0429688 13.5095 -0.0429688L16.2016 -0.0386048C16.7902 -0.0375977 17.269 0.441101 17.269 1.02856V4.19013C17.269 4.7786 16.7896 5.25729 16.2001 5.25729L14.3875 5.25797C13.8347 5.25797 13.694 5.36858 13.6639 5.40248C13.6143 5.45871 13.5552 5.61766 13.5552 6.05658V7.40372H16.0639C16.2528 7.40372 16.4357 7.45021 16.593 7.53783C16.9322 7.72699 17.1431 8.08467 17.1431 8.47122L17.1417 11.8763C17.1417 12.4645 16.6621 12.9432 16.0725 12.9432H13.5552V20.8899C13.5552 21.4783 13.0754 21.957 12.4858 21.957Z"
                          fill="#353846"
                        />
                      </g>
                    </svg>
                  </div>
                  <input
                    type="url"
                    [(ngModel)]="formData.socialMediaUrls.facebook"
                    name="facebookUrl"
                    placeholder="Enter Facebook URL"
                    class="w-full h-[50px] pl-[70px] pr-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Website
                </label>
                <input
                  type="url"
                  [(ngModel)]="formData.website"
                  name="website"
                  placeholder="Enter Website Url"
                  class="w-full h-[50px] px-4 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>

              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Sequence
                </label>
                <input
                  type="number"
                  [(ngModel)]="formData.sequence"
                  name="sequence"
                  placeholder="Enter Sequence"
                  class="w-full h-[50px] px-4 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  min="1"
                />
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-base font-medium text-[#212529] mb-2">
                Description
              </label>
              <div class="border border-[#CED4DA] rounded">
                <div
                  class="flex flex-wrap items-center gap-1 border-b border-[#CED4DA] p-2 bg-white rounded-t"
                >
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
                  <div class="w-px h-5 bg-[#E9ECEF] mx-1"></div>
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
                        d="M17.5 9.37502H11.2225C10.945 9.30039 10.6662 9.23059 10.3863 9.16564C8.63125 8.75064 7.63875 8.44689 7.63875 7.02627C7.6245 6.78103 7.66081 6.53548 7.74542 6.30486C7.83004 6.07424 7.96115 5.86347 8.13062 5.68564C8.6615 5.24908 9.32644 5.00852 10.0137 5.00439C11.7825 4.96064 12.5981 5.56064 13.265 6.47314L14.2744 5.73564C13.8019 5.05711 13.1578 4.51617 12.4078 4.16808C11.6578 3.81999 10.8288 3.67723 10.0056 3.75439C8.99439 3.76085 8.01887 4.12911 7.25563 4.79252C6.96634 5.08595 6.74024 5.43554 6.59125 5.81971C6.44227 6.20389 6.37356 6.61451 6.38937 7.02627C6.36197 7.47682 6.4466 7.92714 6.63572 8.337C6.82483 8.74686 7.11254 9.10349 7.47312 9.37502H2.5V10.625H11.0325C12.2619 10.9813 12.9969 11.445 13.0156 12.7238C13.0359 12.9969 12.9985 13.2713 12.9056 13.529C12.8128 13.7867 12.6667 14.0219 12.4769 14.2194C11.8155 14.7407 10.9938 15.0166 10.1519 15C9.52345 14.9818 8.90738 14.8209 8.35029 14.5296C7.7932 14.2382 7.30966 13.8239 6.93625 13.3181L5.97812 14.1206C6.46358 14.7676 7.08994 15.2955 7.80972 15.6645C8.52951 16.0334 9.32384 16.2336 10.1325 16.25H10.195C11.3492 16.2633 12.4695 15.8596 13.35 15.1131C13.6625 14.7981 13.9054 14.421 14.0632 14.0062C14.2209 13.5914 14.2898 13.1481 14.2656 12.705C14.289 11.947 14.0332 11.2069 13.5469 10.625H17.5V9.37502Z"
                        fill="#212529"
                      />
                    </svg>
                  </button>
                  <div class="w-px h-5 bg-[#E9ECEF] mx-1"></div>
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
                  <div class="w-px h-5 bg-[#E9ECEF] mx-1"></div>
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
                    title="Code"
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
                </div>
                <textarea
                  [(ngModel)]="formData.description"
                  name="description"
                  rows="6"
                  class="w-full px-3 py-2 border-0 rounded-b text-base focus:outline-none resize-none"
                  placeholder="Enter description..."
                ></textarea>
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-base font-medium text-[#212529] mb-2">
                Upload Document
              </label>
              <div
                class="border border-dashed border-[#B9BBBC] rounded p-8 text-center cursor-pointer hover:border-[#009FD8] transition-colors"
                (click)="documentInput.click()"
                (dragover)="onDragOver($event)"
                (drop)="onDrop($event)"
              >
                <svg
                  class="mx-auto mb-4"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.0037 27.6419H19.8316H18.4389H18.1381V20.7045H20.407C20.9824 20.7045 21.3224 20.0506 20.9824 19.5798L16.5689 13.4727C16.2877 13.0804 15.7058 13.0804 15.4246 13.4727L11.011 19.5798C10.671 20.0506 11.0045 20.7045 11.5864 20.7045H13.8553V27.6419H13.5546H12.1618H6.16592C2.73314 27.4523 0 24.2418 0 20.7633C0 18.3636 1.30119 16.2713 3.23008 15.1401C3.05354 14.6628 2.96199 14.1528 2.96199 13.6166C2.96199 11.1646 4.9432 9.18341 7.39518 9.18341C7.92481 9.18341 8.43482 9.27495 8.91214 9.45149C10.331 6.44373 13.3911 4.35791 16.9481 4.35791C21.5513 4.36445 25.3437 7.88876 25.7752 12.3808C29.3126 12.9889 32 16.2647 32 19.9721C32 23.9345 28.9138 27.3673 25.0037 27.6419Z"
                    fill="#878A99"
                  />
                </svg>
                <p class="text-base font-medium text-[#212529]">
                  Drop file here or click to upload.
                </p>
                <input
                  #documentInput
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                  (change)="onDocumentChange($event)"
                />
                <p
                  *ngIf="formData.documentName"
                  class="text-sm text-[#009FD8] mt-2"
                >
                  {{ formData.documentName }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="flex-shrink-0 flex items-center justify-end gap-4 px-[30px] py-6 border-t border-[#CED4DA]"
          >
            <button
              type="button"
              (click)="onCancel()"
              class="flex items-center justify-center gap-3 h-9 px-4 rounded bg-[#DEE1EB] hover:bg-[#CED1DB] transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_close)">
                  <path
                    d="M0.620965 12C0.462896 12 0.304826 11.9399 0.184729 11.8189C-0.0563682 11.5778 -0.0563682 11.1869 0.184729 10.9458L10.9497 0.180823C11.1908 -0.0602744 11.5817 -0.0602744 11.8228 0.180823C12.0639 0.421921 12.0639 0.8128 11.8228 1.05405L1.05795 11.8189C0.936954 11.9392 0.778884 12 0.620965 12Z"
                    fill="#4C546C"
                  />
                  <path
                    d="M11.3867 12C11.2287 12 11.0707 11.9399 10.9505 11.8189L0.184729 1.05405C-0.0563682 0.8128 -0.0563682 0.421921 0.184729 0.180823C0.425827 -0.0602744 0.816707 -0.0602744 1.05795 0.180823L11.8228 10.9458C12.0639 11.1869 12.0639 11.5778 11.8228 11.8189C11.7018 11.9392 11.5439 12 11.3867 12Z"
                    fill="#4C546C"
                  />
                </g>
              </svg>
              <span class="text-base font-semibold text-[#4C546C]">Close</span>
            </button>
            <button
              type="submit"
              class="flex items-center justify-center gap-3 h-9 px-4 bg-[#009FD8] rounded hover:bg-[#0385b5] transition-colors"
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
              <span class="text-base font-semibold text-white">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AddSponsorsModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() eventId: string = "";
  @Input() set sponsorData(data: any) {
    if (data) {
      this.formData = {
        companyName: data.companyName || "",
        email: data.email || "",
        phone: data.phone || "",
        track: data.track || "",
        sequence: data.sequence || 1,
        companyLogo: data.companyLogo || "",
        socialMedia: {
          blogRss: data.socialMedia?.blogRss || false,
          facebook: data.socialMedia?.facebook || false,
          twitter: data.socialMedia?.twitter || false,
        },
        socialMediaUrls: {
          blogRss: data.socialMediaUrls?.blogRss || "",
          facebook: data.socialMediaUrls?.facebook || "",
          twitter: data.socialMediaUrls?.twitter || "",
        },
        sponsorsFor: data.sponsorsFor || "",
        website: data.website || "",
        description: data.description || "",
        documentNames: data.documentNames || [],
      };
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  showSocialMediaDropdown = false;

  formData = {
    companyName: "",
    email: "",
    phone: "",
    track: "",
    sequence: 1,
    companyLogo: "",
    socialMedia: {
      blogRss: false,
      facebook: false,
      twitter: false,
    },
    socialMediaUrls: {
      blogRss: "",
      facebook: "",
      twitter: "",
    },
    sponsorsFor: "",
    website: "",
    description: "",
    documentNames: [] as string[],
  };

  toggleSocialMediaDropdown(): void {
    this.showSocialMediaDropdown = !this.showSocialMediaDropdown;
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.companyLogo = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onDocumentChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.formData.documentName = input.files[0].name;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.formData.documentName = files[0].name;
    }
  }

  onSubmit(): void {
    if (
      this.formData.companyName &&
      this.formData.email &&
      this.formData.phone &&
      this.formData.track
    ) {
      this.submit.emit({ ...this.formData, eventId: this.eventId });
      this.resetForm();
      this.close.emit();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.close.emit();
  }

  private resetForm(): void {
    this.formData = {
      companyName: "",
      email: "",
      phone: "",
      track: "",
      sequence: 1,
      companyLogo: "",
      socialMedia: {
        blogRss: false,
        facebook: false,
        twitter: false,
      },
      socialMediaUrls: {
        blogRss: "",
        facebook: "",
        twitter: "",
      },
      sponsorsFor: "",
      website: "",
      description: "",
      documentName: "",
    };
    this.showSocialMediaDropdown = false;
  }
}
