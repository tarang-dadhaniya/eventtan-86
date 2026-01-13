import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-add-testimonials-modal",
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
              {{ editMode ? "Edit Testimonial" : "Add Testimonials" }}
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
          <div class="flex-1 overflow-y-auto px-[25px] pb-6 min-h-0">
            <!-- Profile Image -->
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div
                  class="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200 cursor-pointer"
                  (click)="profileInput.click()"
                >
                  <img
                    *ngIf="profilePreview"
                    [src]="profilePreview"
                    alt="Profile"
                    class="w-full h-full object-cover"
                  />
                  <div
                    *ngIf="!profilePreview"
                    class="w-full h-full flex items-center justify-center text-gray-400"
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <button
                  type="button"
                  (click)="profileInput.click()"
                  class="absolute bottom-0 right-0 w-6 h-6 bg-[#009FD8] rounded-full flex items-center justify-center shadow-md hover:bg-[#0385b5] transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.4296 10.537C5.3176 10.537 5.2059 10.494 5.1203 10.409C4.9495 10.238 4.9495 9.961 5.1203 9.79L11.9571 2.953C12.1278 2.782 12.4049 2.782 12.5758 2.953C12.7466 3.124 12.7466 3.401 12.5758 3.572L5.7389 10.409C5.6536 10.494 5.5416 10.537 5.4296 10.537Z"
                      fill="white"
                    />
                    <path
                      d="M4.7543 13.687C4.7239 13.687 4.6931 13.684 4.6622 13.678C4.426 13.627 4.2755 13.394 4.3262 13.158L5.0022 10.007C5.0529 9.771 5.2866 9.621 5.5217 9.671C5.758 9.722 5.9085 9.955 5.8577 10.191L5.1818 13.342C5.1378 13.547 4.9562 13.687 4.7543 13.687Z"
                      fill="white"
                    />
                    <path
                      d="M7.9023 13.012C7.7903 13.012 7.6785 12.969 7.593 12.883C7.4221 12.713 7.4221 12.436 7.593 12.265L14.4298 5.428C14.6004 5.257 14.8776 5.257 15.0484 5.428C15.2193 5.599 15.2193 5.876 15.0484 6.047L8.2118 12.883C8.1263 12.969 8.0143 13.012 7.9023 13.012Z"
                      fill="white"
                    />
                    <path
                      d="M4.7536 13.688C4.5517 13.688 4.3704 13.547 4.3262 13.342C4.2757 13.105 4.4259 12.873 4.6622 12.822L7.8128 12.146C8.0493 12.096 8.2818 12.246 8.3324 12.482C8.3829 12.718 8.2326 12.951 7.9964 13.002L4.8457 13.678C4.8149 13.684 4.784 13.688 4.7536 13.688Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <input
                  #profileInput
                  type="file"
                  accept="image/*"
                  class="hidden"
                  (change)="onProfileChange($event)"
                />
              </div>
            </div>

            <!-- First Name and Last Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-[#434349] text-base placeholder-[#C2C3CB] focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-[#434349] text-base placeholder-[#C2C3CB] focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>
            </div>

            <!-- Company and Designation -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.company"
                  name="company"
                  placeholder="Enter Company Name"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-[#434349] text-base placeholder-[#C2C3CB] focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  [(ngModel)]="formData.designation"
                  name="designation"
                  placeholder="Enter Designation"
                  class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded text-[#434349] text-base placeholder-[#C2C3CB] focus:outline-none focus:border-[#009FD8] transition-colors"
                />
              </div>
            </div>

            <!-- Is Exhibitors and Testimonials for -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]">
              <div>
                <label
                  class="block text-base font-medium text-[#212529] mb-[25px]"
                >
                  Is Exhibitors
                </label>
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    [(ngModel)]="formData.isExhibitor"
                    name="isExhibitor"
                    class="w-6 h-6 rounded border-2 border-[#BFC3C5] text-[#009FD8] focus:ring-[#009FD8] cursor-pointer"
                  />
                </label>
              </div>
              <div>
                <label class="block text-base font-medium text-[#212529] mb-2">
                  Testimonials for
                </label>
                <div class="relative">
                  <select
                    [(ngModel)]="formData.testimonialsFor"
                    name="testimonialsFor"
                    class="w-full h-[50px] px-5 pr-10 border-2 border-[#E9EBEC] rounded text-[#434349] text-base focus:outline-none focus:border-[#009FD8] appearance-none bg-white transition-colors"
                  >
                    <option value="" disabled selected class="text-[#C2C3CB]">
                      Please Select
                    </option>
                    <option value="event">Event</option>
                    <option value="speaker">Speaker</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="exhibitor">Exhibitor</option>
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
                      d="M8.19527 0.193128C8.45562 -0.0643764 8.87773 -0.0643764 9.13808 0.193128C9.39842 0.450632 9.39842 0.868128 9.13808 1.12563L5.13808 5.08191C4.88569 5.33154 4.4793 5.34028 4.21619 5.10173L0.216187 1.47514C-0.0552254 1.22906 -0.0735598 0.811957 0.175235 0.54351C0.424029 0.275064 0.845741 0.256929 1.11715 0.503005L4.64662 3.70299L8.19527 0.193128Z"
                      fill="#434349"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message Field with Rich Text Editor Toolbar -->
            <div class="mb-[30px]">
              <label class="block text-base font-medium text-[#212529] mb-2">
                Message
              </label>
              <div class="border-2 border-[#CED4DA] rounded overflow-hidden">
                <!-- Toolbar -->
                <div
                  class="flex flex-wrap items-center gap-1 p-2 border-b-2 border-[#CED4DA] bg-white"
                >
                  <!-- Undo/Redo -->
                  <div
                    class="flex items-center gap-0.5 border-r border-[#E9ECEF] pr-2"
                  >
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Undo"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M12.5 6.25H4.88438L7.12625 4.00875L6.25 3.125L2.5 6.875L6.25 10.625L7.12625 9.74062L4.88625 7.5H12.5C13.4946 7.5 14.4484 7.89509 15.1517 8.59835C15.8549 9.30161 16.25 10.2554 16.25 11.25C16.25 12.2446 15.8549 13.1984 15.1517 13.9017C14.4484 14.6049 13.4946 15 12.5 15H7.5V16.25H12.5C13.8261 16.25 15.0979 15.7232 16.0355 14.7855C16.9732 13.8479 17.5 12.5761 17.5 11.25C17.5 9.92392 16.9732 8.65215 16.0355 7.71447C15.0979 6.77678 13.8261 6.25 12.5 6.25Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Redo"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M7.5 6.25H15.1156L12.8737 4.00875L13.75 3.125L17.5 6.875L13.75 10.625L12.8737 9.74062L15.1137 7.5H7.5C6.50544 7.5 5.55161 7.89509 4.84835 8.59835C4.14509 9.30161 3.75 10.2554 3.75 11.25C3.75 12.2446 4.14509 13.1984 4.84835 13.9017C5.55161 14.6049 6.50544 15 7.5 15H12.5V16.25H7.5C6.17392 16.25 4.90215 15.7232 3.96447 14.7855C3.02678 13.8479 2.5 12.5761 2.5 11.25C2.5 9.92392 3.02678 8.65215 3.96447 7.71447C4.90215 6.77678 6.17392 6.25 7.5 6.25Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Text Style Dropdown -->
                  <div class="flex items-center border-r border-[#E9ECEF] pr-2">
                    <button
                      type="button"
                      class="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-sm text-[#212529]"
                    >
                      <span>Normal text</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 11L3 6.00005L3.7 5.30005L8 9.60005L12.3 5.30005L13 6.00005L8 11Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Format buttons -->
                  <div
                    class="flex items-center gap-0.5 border-r border-[#E9ECEF] pr-2"
                  >
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
                      >
                        <path
                          d="M2.5 16.25H17.5V17.5H2.5V16.25ZM10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10V3.125H6.875V10C6.875 10.8288 7.20424 11.6237 7.79029 12.2097C8.37634 12.7958 9.1712 13.125 10 13.125C10.8288 13.125 11.6237 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10V3.125H14.375V10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Lists -->
                  <div
                    class="flex items-center gap-0.5 border-r border-[#E9ECEF] pr-2"
                  >
                    <button
                      type="button"
                      class="p-1 hover:bg-gray-100 rounded"
                      title="Bulleted List"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
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
                      title="Numbered List"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 13.75H18.75V15H10V13.75ZM10 5H18.75V6.25H10V5ZM5 7.5V2.5H3.75V3.125H2.5V4.375H3.75V7.5H2.5V8.75H6.25V7.5H5ZM6.25 17.5H2.5V15C2.5 14.6685 2.6317 14.3505 2.86612 14.1161C3.10054 13.8817 3.41848 13.75 3.75 13.75H5V12.5H2.5V11.25H5C5.33152 11.25 5.64946 11.3817 5.88388 11.6161C6.1183 11.8505 6.25 12.1685 6.25 12.5V13.75C6.25 14.0815 6.1183 14.3995 5.88388 14.6339C5.64946 14.8683 5.33152 15 5 15H3.75V16.25H6.25V17.5Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Additional tools -->
                  <div class="flex items-center gap-0.5">
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
                      >
                        <path
                          d="M18.2803 4.22503C17.9319 3.87543 17.518 3.59804 17.0621 3.40877C16.6063 3.2195 16.1176 3.12207 15.6241 3.12207C15.1305 3.12207 14.6418 3.2195 14.186 3.40877C13.7302 3.59804 13.3162 3.87543 12.9678 4.22503L13.8553 5.11253C14.088 4.87984 14.3642 4.69526 14.6683 4.56934C14.9723 4.44341 15.2981 4.37859 15.6272 4.37859C15.9563 4.37859 16.2821 4.44341 16.5861 4.56934C16.8901 4.69526 17.1664 4.87984 17.3991 5.11253C17.6318 5.34521 17.8163 5.62145 17.9423 5.92547C18.0682 6.22949 18.133 6.55533 18.133 6.8844C18.133 7.21347 18.0682 7.53931 17.9423 7.84333C17.8163 8.14735 17.6318 8.42359 17.3991 8.65628L12.3991 13.6563C11.93 14.1262 11.2934 14.3905 10.6294 14.3911C9.9654 14.3917 9.32837 14.1285 8.85844 13.6594C8.38851 13.1903 8.12418 12.5537 8.12359 11.8897C8.123 11.2257 8.38621 10.5887 8.85532 10.1188L9.73657 9.23128L8.85532 8.34378L7.96782 9.23128C7.61822 9.57966 7.34083 9.99364 7.15156 10.4495C6.96229 10.9053 6.86486 11.394 6.86486 11.8875C6.86486 12.3811 6.96229 12.8698 7.15156 13.3256C7.34083 13.7814 7.61822 14.1954 7.96782 14.5438C8.675 15.2419 9.63036 15.6308 10.6241 15.625C11.1195 15.6271 11.6105 15.5309 12.0685 15.3421C12.5266 15.1533 12.9427 14.8756 13.2928 14.525L18.2928 9.52503C18.9934 8.82025 19.3856 7.86619 19.3833 6.87244C19.3809 5.87869 18.9842 4.9265 18.2803 4.22503Z"
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
                      >
                        <path
                          d="M16.25 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM16.25 16.25H3.75V12.5L6.875 9.375L10.3688 12.8687C10.603 13.1016 10.9198 13.2322 11.25 13.2322C11.5802 13.2322 11.897 13.1016 12.1313 12.8687L13.125 11.875L16.25 15V16.25ZM16.25 13.2312L14.0063 10.9875C13.772 10.7547 13.4552 10.624 13.125 10.624C12.7948 10.624 12.478 10.7547 12.2437 10.9875L11.25 11.9812L7.75625 8.4875C7.52205 8.25469 7.20523 8.12401 6.875 8.12401C6.54477 8.12401 6.22795 8.25469 5.99375 8.4875L3.75 10.7312V3.75H16.25V13.2312Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Text Area -->
                <textarea
                  [(ngModel)]="formData.message"
                  name="message"
                  rows="8"
                  class="w-full px-4 py-3 text-base text-[#434349] focus:outline-none resize-none"
                  placeholder="Enter your message..."
                ></textarea>
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
export class AddTestimonialsModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() editMode = false;
  @Input() set testimonialData(data: any) {
    if (data) {
      this.formData = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        company: data.company || "",
        designation: data.designation || "",
        isExhibitor: data.isExhibitor || false,
        testimonialsFor: data.testimonialsFor || "",
        message: data.message || "",
        profileImage: data.profileImage || null,
      };
      if (data.profileImage) {
        this.profilePreview = data.profileImage;
      }
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  profilePreview: string | null = null;

  formData = {
    firstName: "",
    lastName: "",
    company: "",
    designation: "",
    isExhibitor: false,
    testimonialsFor: "",
    message: "",
    profileImage: null as File | null,
  };

  onProfileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.profileImage = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    // Validate that at least required fields are filled
    if (!this.formData.firstName?.trim() || !this.formData.company?.trim() || !this.formData.designation?.trim()) {
      alert('Please fill in First Name, Company, and Designation fields.');
      return;
    }

    this.submit.emit({ ...this.formData, profilePreview: this.profilePreview });
    this.resetForm();
    this.close.emit();
  }

  onKeyDownEnter(event: KeyboardEvent): void {
    // Prevent form submission on Enter key in input fields
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      if (event.target.tagName === 'INPUT' && (event.target as HTMLInputElement).type !== 'submit') {
        event.preventDefault();
      }
    }
  }

  onCancel(): void {
    this.resetForm();
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reset form when modal closes
    if (changes['isOpen'] && !changes['isOpen'].currentValue && changes['isOpen'].previousValue) {
      this.resetForm();
    }

    // Reset form when opening for new testimonial (not edit mode)
    if (changes['editMode'] && !changes['editMode'].currentValue) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formData = {
      firstName: "",
      lastName: "",
      company: "",
      designation: "",
      isExhibitor: false,
      testimonialsFor: "",
      message: "",
      profileImage: null,
    };
    this.profilePreview = null;
  }
}
