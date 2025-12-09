import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-social-media-modal",
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
        <!-- Header -->
        <div class="flex-shrink-0 px-[30px] py-[30px]">
          <div class="flex items-center justify-between">
            <h2 class="text-[22px] font-medium text-[#3F4254]">
              {{ editMode ? "Edit Social Media" : "Add Social Media" }}
            </h2>
            <button
              type="button"
              (click)="onCancel()"
              class="text-[#3F4254] hover:text-[#212529] transition-colors"
              aria-label="Close modal"
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

        <!-- Body -->
        <form class="flex-1 flex flex-col min-h-0" (ngSubmit)="onSubmit()">
          <div class="flex-1 overflow-y-auto px-[30px] pb-6 min-h-0">
            <!-- Social Media Dropdown (Only shown in Add mode) -->
            <div class="mb-[30px]" *ngIf="!editMode">
              <label class="block text-base font-medium text-[#212529] mb-2">
                Social Media
              </label>
              <div class="relative">
                <button
                  type="button"
                  (click)="toggleDropdown()"
                  class="w-full h-[50px] px-4 border-2 border-[#E9EBEC] text-[#C2C3CB] text-base text-left focus:outline-none focus:border-[#009FD8] transition-colors bg-white"
                  [class.rounded]="!showDropdown"
                  [class.rounded-t]="showDropdown"
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
                    d="M8.19396 0.193108C8.45431 -0.0643956 8.87642 -0.0643956 9.13677 0.193108C9.39712 0.450612 9.39712 0.868109 9.13677 1.12561L5.13677 5.0819C4.88438 5.33152 4.47799 5.34026 4.21488 5.10171L0.214881 1.47512C-0.0565313 1.22904 -0.0748657 0.811938 0.173929 0.543491C0.422723 0.275045 0.844435 0.25691 1.11585 0.502986L4.64531 3.70297L8.19396 0.193108Z"
                    fill="#434349"
                  />
                </svg>
              </div>

              <!-- Dropdown Content -->
              <div
                *ngIf="showDropdown"
                class="border-2 border-t-0 border-[#E9EBEC] rounded-b bg-white"
              >
                <div class="px-4 py-3 space-y-3">
                  <!-- Blog/Rss -->
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative w-5 h-5 flex-shrink-0">
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.blogRss"
                        name="blogRss"
                        class="w-5 h-5 rounded border-2 border-[#BFC3C5] appearance-none checked:bg-[#009FD8] checked:border-[#009FD8] cursor-pointer transition-colors"
                      />
                      <svg
                        *ngIf="formData.socialMedia.blogRss"
                        class="absolute top-0.5 left-0.5 pointer-events-none"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.0228 3.29512C12.2678 3.50945 12.29 3.88283 12.0721 4.12464L5.93903 10.932C5.72002 11.1751 5.34399 11.1906 5.10578 10.9663L1.55676 7.62522C1.33543 7.41685 1.31425 7.06965 1.50414 6.8323C1.71367 6.57038 2.10387 6.53433 2.35324 6.75862L5.1068 9.2354C5.34609 9.45065 5.71451 9.4314 5.9301 9.1924L11.2055 3.34337C11.4189 3.10668 11.783 3.08522 12.0228 3.29512Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="text-base text-black">Blog/Rss</span>
                  </label>

                  <!-- Facebook -->
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative w-5 h-5 flex-shrink-0">
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.facebook"
                        name="facebook"
                        class="w-5 h-5 rounded border-2 border-[#BFC3C5] appearance-none checked:bg-[#009FD8] checked:border-[#009FD8] cursor-pointer transition-colors"
                      />
                      <svg
                        *ngIf="formData.socialMedia.facebook"
                        class="absolute top-0.5 left-0.5 pointer-events-none"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.0228 3.29512C12.2678 3.50945 12.29 3.88283 12.0721 4.12464L5.93903 10.932C5.72002 11.1751 5.34399 11.1906 5.10578 10.9663L1.55676 7.62522C1.33543 7.41685 1.31425 7.06965 1.50414 6.8323C1.71367 6.57038 2.10387 6.53433 2.35324 6.75862L5.1068 9.2354C5.34609 9.45065 5.71451 9.4314 5.9301 9.1924L11.2055 3.34337C11.4189 3.10668 11.783 3.08522 12.0228 3.29512Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="text-base text-black">Facebook</span>
                  </label>

                  <!-- Twitter -->
                  <label class="flex items-center gap-3 cursor-pointer group">
                    <div class="relative w-5 h-5 flex-shrink-0">
                      <input
                        type="checkbox"
                        [(ngModel)]="formData.socialMedia.twitter"
                        name="twitter"
                        class="w-5 h-5 rounded border-2 border-[#BFC3C5] appearance-none checked:bg-[#009FD8] checked:border-[#009FD8] cursor-pointer transition-colors"
                      />
                      <svg
                        *ngIf="formData.socialMedia.twitter"
                        class="absolute top-0.5 left-0.5 pointer-events-none"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.0228 3.29512C12.2678 3.50945 12.29 3.88283 12.0721 4.12464L5.93903 10.932C5.72002 11.1751 5.34399 11.1906 5.10578 10.9663L1.55676 7.62522C1.33543 7.41685 1.31425 7.06965 1.50414 6.8323C1.71367 6.57038 2.10387 6.53433 2.35324 6.75862L5.1068 9.2354C5.34609 9.45065 5.71451 9.4314 5.9301 9.1924L11.2055 3.34337C11.4189 3.10668 11.783 3.08522 12.0228 3.29512Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span class="text-base text-black">Twitter</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- URL Section -->
            <div
              *ngIf="
                editMode || formData.socialMedia.blogRss || formData.socialMedia.facebook || formData.socialMedia.twitter
              "
            >
              <label
                class="block text-base font-medium text-[#212529]"
                [class.mb-[31px]]="!editMode"
              >
                URL
              </label>

              <div [class.space-y-[30px]]="!editMode" [class.mt-[31px]]="editMode">
                <!-- Blog/Rss URL -->
                <div *ngIf="formData.socialMedia.blogRss" class="relative">
                  <div
                    class="absolute left-0 top-0 w-[50px] h-[50px] bg-[#F5F5F5] rounded-l flex items-center justify-center pointer-events-none z-10"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_294_6106)">
                        <path
                          d="M3.09074 15.8186C1.38647 15.8186 0 17.2051 0 18.9093C0 20.6135 1.38652 22 3.09074 22C4.79497 22 6.18144 20.6135 6.18144 18.9093C6.18144 17.2051 4.79493 15.8186 3.09074 15.8186ZM3.09074 20.7032C2.10152 20.7032 1.2968 19.8984 1.2968 18.9093C1.2968 17.9201 2.1016 17.1154 3.09074 17.1154C4.07984 17.1154 4.88464 17.9201 4.88464 18.9093C4.8846 19.8984 4.07988 20.7032 3.09074 20.7032Z"
                          fill="#353846"
                        />
                        <path
                          d="M14.8538 20.0612C14.2232 16.8822 12.6741 13.9813 10.3742 11.6721C8.05793 9.34652 5.14108 7.78138 1.93905 7.14601C1.46021 7.051 0.969375 7.17402 0.592238 7.48361C0.215832 7.79256 0 8.24906 0 8.73602V10.3368C0 11.1014 0.521512 11.7518 1.26827 11.9184C3.41924 12.3989 5.3845 13.4811 6.95157 15.0481C8.51903 16.6157 9.60128 18.5808 10.0813 20.7312C10.248 21.4781 10.8985 21.9997 11.663 21.9997H13.2637C13.7506 21.9997 14.2071 21.7838 14.5161 21.4075C14.8257 21.0305 14.9487 20.5399 14.8538 20.0612ZM13.5139 20.5846C13.4776 20.6288 13.3969 20.7029 13.2636 20.7029H11.663C11.5103 20.7029 11.3803 20.5984 11.3469 20.4488C10.8132 18.0577 9.61035 15.8731 7.86848 14.1312C6.12704 12.3898 3.94243 11.187 1.55079 10.6529C1.40121 10.6195 1.29675 10.4895 1.29675 10.3368V8.73602C1.29675 8.6029 1.37092 8.52217 1.41509 8.48586C1.45187 8.45578 1.52251 8.41135 1.62027 8.41135C1.64115 8.41135 1.66323 8.41337 1.68661 8.41801C4.63513 9.00312 7.32145 10.4448 9.45536 12.5872C11.5741 14.7146 13.0011 17.3863 13.5818 20.3135C13.6079 20.4456 13.5505 20.5401 13.5139 20.5846Z"
                          fill="#353846"
                        />
                        <path
                          d="M21.9857 20.1694C21.6484 17.6188 20.8979 15.158 19.7548 12.8556C18.6406 10.6109 17.179 8.56621 15.4109 6.77832C13.6113 4.95838 11.5436 3.4537 9.26518 2.30613C6.92845 1.12905 4.42741 0.357885 1.83163 0.0139202C1.37027 -0.0470095 0.904148 0.0938851 0.553438 0.401155C0.201738 0.709326 0 1.15414 0 1.6216V3.20499C0 4.0046 0.599887 4.69356 1.39545 4.8076C5.34329 5.37371 8.94128 7.15799 11.8004 9.96729C13.2355 11.3778 14.4265 12.9976 15.3405 14.782C16.277 16.6102 16.8997 18.5686 17.1913 20.6024C17.3054 21.399 17.9956 21.9997 18.7966 21.9997H20.3778C20.8452 21.9997 21.2901 21.798 21.5982 21.4465C21.9055 21.0961 22.0466 20.6305 21.9857 20.1694ZM20.6231 20.5916C20.5867 20.6331 20.5064 20.7028 20.3778 20.7028H18.7967C18.634 20.7028 18.4986 20.5832 18.4751 20.4184C18.1631 18.2421 17.4968 16.1468 16.4948 14.1907C15.5174 12.2826 14.2438 10.5504 12.7094 9.04234C9.6516 6.03784 5.80293 4.12955 1.5794 3.52387C1.41569 3.5004 1.29684 3.36626 1.29684 3.20491V1.62151C1.29684 1.49312 1.36649 1.41285 1.40804 1.37646C1.44405 1.34496 1.51594 1.29649 1.6176 1.29649C1.63161 1.29649 1.64618 1.29748 1.6613 1.29942C4.11288 1.62435 6.47496 2.35262 8.68175 3.46405C10.8344 4.54833 12.7881 5.97016 14.4886 7.6899C16.1595 9.37947 17.5405 11.3114 18.5932 13.432C19.6726 15.6063 20.3815 17.9303 20.7 20.3391C20.7164 20.4636 20.6589 20.5507 20.6231 20.5916Z"
                          fill="#353846"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_294_6106">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <input
                    type="url"
                    [(ngModel)]="formData.urls.blogRss"
                    name="blogRssUrl"
                    placeholder="Enter Blog/Rss URL"
                    class="w-full h-[50px] pl-[70px] pr-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-[#434349] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>

                <!-- Facebook URL -->
                <div *ngIf="formData.socialMedia.facebook" class="relative">
                  <div
                    class="absolute left-0 top-0 w-[50px] h-[50px] bg-[#F5F5F5] rounded-l flex items-center justify-center pointer-events-none z-10"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_294_6146)">
                        <path
                          d="M12.4858 21.957H8.9558C8.36618 21.957 7.88654 21.4783 7.88654 20.8899V12.9433H5.82707C5.23745 12.9433 4.75781 12.4645 4.75781 11.8762V8.47106C4.75781 7.88259 5.23745 7.40389 5.82707 7.40389H7.88654V5.69873C7.88654 4.00801 8.41848 2.56957 9.42467 1.53915C10.4354 0.504044 11.8479 -0.0429688 13.5095 -0.0429688L16.2016 -0.0386048C16.7902 -0.0375977 17.269 0.441101 17.269 1.02856V4.19013C17.269 4.7786 16.7896 5.25729 16.2001 5.25729L14.3875 5.25797C13.8347 5.25797 13.694 5.36858 13.6639 5.40248C13.6143 5.45871 13.5552 5.61766 13.5552 6.05658V7.40372H16.0639C16.2528 7.40372 16.4357 7.45021 16.593 7.53783C16.9322 7.72699 17.1431 8.08467 17.1431 8.47122L17.1417 11.8763C17.1417 12.4645 16.6621 12.9432 16.0725 12.9432H13.5552V20.8899C13.5552 21.4783 13.0754 21.957 12.4858 21.957ZM9.1788 20.6673H12.2628V12.3659C12.2628 11.973 12.5832 11.6534 12.9767 11.6534H15.8495L15.8506 8.69362H12.9765C12.583 8.69362 12.2628 8.37404 12.2628 7.98111V6.05658C12.2628 5.5527 12.3141 4.97968 12.6952 4.54898C13.1556 4.02832 13.8813 3.96823 14.3872 3.96823L15.9768 3.96756V1.25079L13.5085 1.24677C10.8382 1.24677 9.1788 2.95276 9.1788 5.69873V7.98111C9.1788 8.37387 8.8586 8.69362 8.46507 8.69362H6.05007V11.6534H8.46507C8.8586 11.6534 9.1788 11.973 9.1788 12.3659V20.6673Z"
                          fill="#353846"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_294_6146">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <input
                    type="url"
                    [(ngModel)]="formData.urls.facebook"
                    name="facebookUrl"
                    placeholder="Enter Facebook URL"
                    class="w-full h-[50px] pl-[70px] pr-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-[#434349] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>

                <!-- Twitter URL -->
                <div *ngIf="formData.socialMedia.twitter" class="relative">
                  <div
                    class="absolute left-0 top-0 w-[50px] h-[50px] bg-[#F5F5F5] rounded-l flex items-center justify-center pointer-events-none z-10"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_294_6176)">
                        <path
                          d="M20.1494 4.39638C19.4111 4.74466 18.6156 4.98186 17.7778 5.08278C18.6368 4.56118 19.2919 3.73818 19.5891 2.77138C18.7913 3.25638 17.8989 3.60466 16.9399 3.80218C16.1844 3.00538 15.1055 2.5 13.8915 2.5C11.5725 2.5 9.71222 4.36028 9.71222 6.67928C9.71222 7.02038 9.75222 7.35138 9.82888 7.66758C6.52444 7.51618 3.63666 5.93578 1.72111 3.48458C1.32888 4.15858 1.10222 4.95958 1.10222 5.81278C1.10222 7.44478 1.97555 8.88018 3.31555 9.65878C2.66222 9.63938 2.03777 9.47598 1.50222 9.18798V9.24038C1.50222 11.3022 2.86777 13.0318 4.74999 13.4438C4.37222 13.5398 3.97444 13.5958 3.56111 13.5958C3.27333 13.5958 2.99333 13.5683 2.71888 13.5162C3.28888 15.2146 4.77777 16.4612 6.57111 16.4982C5.22888 17.6302 3.47999 18.3138 1.56666 18.3138C1.21111 18.3138 0.869439 18.2926 0.533325 18.2486C2.35111 19.474 4.62444 20.3 7.10666 20.3C13.8804 20.3 17.1044 13.6656 17.1044 7.75838C17.1044 7.59418 17.0999 7.43118 17.0921 7.26998C17.9089 6.68198 18.6402 5.95498 19.2344 5.1242C18.5489 5.41538 17.8089 5.61718 17.0355 5.70718Z"
                          fill="#353846"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_294_6176">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <input
                    type="url"
                    [(ngModel)]="formData.urls.twitter"
                    name="twitterUrl"
                    placeholder="Enter Twitter URL"
                    class="w-full h-[50px] pl-[70px] pr-5 border-2 border-[#E9EBEC] rounded placeholder:text-[#C2C3CB] text-[#434349] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex-shrink-0 flex items-center justify-end gap-4 px-[30px] py-6 border-t border-[#CED4DA]"
          >
            <button
              type="button"
              (click)="onCancel()"
              class="flex items-center justify-center gap-3 h-9 px-[17px] rounded bg-[#DEE1EB] hover:bg-[#CED1DB] transition-colors"
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
                <defs>
                  <clipPath id="clip0_close">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span class="text-base font-semibold text-[#4C546C]">Close</span>
            </button>
            <button
              type="submit"
              class="flex items-center justify-center gap-3 h-9 px-[18px] bg-[#009FD8] rounded hover:bg-[#0385b5] transition-colors"
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
export class AddSocialMediaModalComponent {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() set socialMediaData(data: any) {
    if (data) {
      if (data.type) {
        const typeMap: { [key: string]: "blogRss" | "facebook" | "twitter" } = {
          "Blog/Rss": "blogRss",
          Facebook: "facebook",
          Twitter: "twitter",
        };
        const socialMediaType = typeMap[data.type] || "facebook";
        this.formData = {
          socialMedia: {
            blogRss: socialMediaType === "blogRss",
            facebook: socialMediaType === "facebook",
            twitter: socialMediaType === "twitter",
          },
          urls: {
            blogRss: socialMediaType === "blogRss" ? data.url : "",
            facebook: socialMediaType === "facebook" ? data.url : "",
            twitter: socialMediaType === "twitter" ? data.url : "",
          },
        };
      } else {
        this.formData = {
          socialMedia: {
            blogRss: data.socialMedia?.blogRss || false,
            facebook: data.socialMedia?.facebook || false,
            twitter: data.socialMedia?.twitter || false,
          },
          urls: {
            blogRss: data.urls?.blogRss || "",
            facebook: data.urls?.facebook || "",
            twitter: data.urls?.twitter || "",
          },
        };
      }
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  showDropdown = false;

  formData = {
    socialMedia: {
      blogRss: false,
      facebook: false,
      twitter: false,
    },
    urls: {
      blogRss: "",
      facebook: "",
      twitter: "",
    },
  };

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onSubmit(): void {
    this.submit.emit({ ...this.formData });
    this.resetForm();
    this.close.emit();
  }

  onCancel(): void {
    this.resetForm();
    this.close.emit();
  }

  private resetForm(): void {
    this.formData = {
      socialMedia: {
        blogRss: false,
        facebook: false,
        twitter: false,
      },
      urls: {
        blogRss: "",
        facebook: "",
        twitter: "",
      },
    };
    this.showDropdown = false;
  }
}
