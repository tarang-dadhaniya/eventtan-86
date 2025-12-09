import { Component, Output, EventEmitter, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GalleryImage } from "../services/image-gallery.service";

@Component({
  selector: "app-add-image-gallery-modal",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Modal Overlay -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      (click)="onOverlayClick($event)"
    >
      <!-- Modal Container -->
      <div
        class="bg-white rounded-[4px] w-full max-w-2xl max-h-[90vh] flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Fixed Header -->
        <div
          class="flex items-center justify-between px-8 py-6 border-b border-[#ECECEC] flex-shrink-0"
        >
          <h2 class="text-[22px] font-medium text-[#3F4254]">
            {{ editMode ? "Edit Image" : "Add Image" }}
          </h2>
          <button
            (click)="onClose()"
            class="w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Close modal"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.929495 18C0.692391 18 0.455286 17.9099 0.275141 17.7284C-0.0865054 17.3667 -0.0865054 16.7804 0.275141 16.4187L16.4227 0.271235C16.7843 -0.0904116 17.3706 -0.0904116 17.7323 0.271235C18.0939 0.632881 18.0939 1.2192 17.7323 1.58107L1.58498 17.7284C1.40348 17.9087 1.16637 18 0.929495 18Z"
                fill="#3F4254"
              />
              <path
                d="M17.0781 18C16.841 18 16.6042 17.9099 16.4238 17.7284L0.275141 1.58107C-0.0865054 1.2192 -0.0865054 0.632881 0.275141 0.271235C0.636787 -0.0904116 1.22311 -0.0904116 1.58498 0.271235L17.7323 16.4187C18.0939 16.7804 18.0939 17.3667 17.7323 17.7284C17.5508 17.9087 17.3139 18 17.0781 18Z"
                fill="#3F4254"
              />
            </svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto px-8 py-6">
          <div class="space-y-6">
            <!-- Two Column Layout: Thumbnail and Name -->
            <div class="grid grid-cols-2 gap-6">
              <!-- Select Thumbnail Image -->
              <div>
                <label class="block text-base font-medium text-[#212529] mb-3">
                  Select Thumbnail Image
                </label>
                <div
                  class="w-full h-40 border-2 border-[#E9EBEC] rounded-[4px] overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer hover:border-[#009FD8] transition-colors"
                  (click)="thumbnailInput.click()"
                >
                  <img
                    *ngIf="formData.thumbnailImageUrl"
                    [src]="formData.thumbnailImageUrl"
                    alt="Thumbnail preview"
                    class="w-full h-full object-cover"
                  />
                  <div *ngIf="!formData.thumbnailImageUrl" class="text-center">
                    <svg
                      class="mx-auto mb-2 w-8 h-8 text-[#878A99]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="text-sm text-[#878A99]">Click to upload</p>
                  </div>
                </div>
                <input
                  #thumbnailInput
                  type="file"
                  class="hidden"
                  accept="image/*"
                  (change)="onThumbnailSelected($event)"
                />
              </div>

              <!-- Right Column: Name and Gallery For -->
              <div class="space-y-6">
                <!-- Name Field -->
                <div>
                  <label class="block text-base font-medium text-[#212529] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="formData.title"
                    placeholder="Enter Name"
                    class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded-[4px] placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
                  />
                </div>

                <!-- Image Gallery For Dropdown -->
                <div>
                  <label class="block text-base font-medium text-[#212529] mb-2">
                    Image Gallery For
                  </label>
                  <select
                    [(ngModel)]="formData.imageGalleryFor"
                    class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded-[4px] text-base focus:outline-none focus:border-[#009FD8] transition-colors appearance-none bg-white cursor-pointer"
                    style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22 viewBox=%220 0 10 6%22 fill=%22%23434349%22><path d=%22M8.31068 0.193108C8.57471 -0.0643956 9.00279 -0.0643956 9.26682 0.193108C9.53085 0.450612 9.53085 0.868109 9.26682 1.12561L5.21024 5.0819C4.95429 5.33152 4.54215 5.34026 4.27532 5.10171L0.218738 1.47512C-0.0565142 1.22904 -0.075108 0.811938 0.177206 0.543491C0.42952 0.275045 0.857196 0.25691 1.13245 0.502986L4.71184 3.70297L8.31068 0.193108Z%22/></svg>'); background-repeat: no-repeat; background-position: right 15px center; padding-right: 40px;"
                  >
                    <option value="" disabled selected>Please Select</option>
                    <option value="gallery1">Gallery 1</option>
                    <option value="gallery2">Gallery 2</option>
                    <option value="gallery3">Gallery 3</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- ViewMore Url Field -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                ViewMore Url
              </label>
              <input
                type="url"
                [(ngModel)]="formData.viewMoreUrl"
                placeholder="Enter Url"
                class="w-full h-[50px] px-5 border-2 border-[#E9EBEC] rounded-[4px] placeholder:text-[#C2C3CB] text-base focus:outline-none focus:border-[#009FD8] transition-colors"
              />
            </div>

            <!-- Product Image -->
            <div>
              <label class="block text-base font-medium text-[#212529] mb-2">
                Product Image
              </label>
              <div
                class="w-full border-2 border-dashed border-[#B9BBBC] rounded-[4px] p-8 text-center cursor-pointer hover:border-[#009FD8] transition-colors flex flex-col items-center justify-center min-h-[120px]"
                (click)="productImageInput.click()"
              >
                <svg
                  class="w-8 h-8 text-[#878A99] mb-3"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.0037 27.6421H19.8316H18.4389H18.1381V20.7046H20.407C20.9824 20.7046 21.3224 20.0507 20.9824 19.5799L16.5689 13.4729C16.2877 13.0805 15.7058 13.0805 15.4246 13.4729L11.011 19.5799C10.671 20.0507 11.0045 20.7046 11.5864 20.7046H13.8553V27.6421H13.5546H12.1618H6.16592C2.73314 27.4524 0 24.242 0 20.7634C0 18.3638 1.30119 16.2714 3.23008 15.1402C3.05354 14.6629 2.96199 14.1529 2.96199 13.6167C2.96199 11.1647 4.9432 9.18353 7.39518 9.18353C7.92481 9.18353 8.43482 9.27507 8.91214 9.45162C10.331 6.44385 13.3911 4.35803 16.9481 4.35803C21.5513 4.36457 25.3437 7.88889 25.7752 12.3809C29.3126 12.989 32 16.2649 32 19.9723C32 23.9347 28.9138 27.3674 25.0037 27.6421Z"
                    fill="#878A99"
                  />
                </svg>
                <p class="text-[#212529] font-medium text-base">
                  Drop Images here or click to upload.
                </p>
              </div>
              <input
                #productImageInput
                type="file"
                class="hidden"
                accept="image/*"
                (change)="onProductImageSelected($event)"
              />
              <div *ngIf="productImagePreview" class="mt-4">
                <img
                  [src]="productImagePreview"
                  alt="Product preview"
                  class="max-h-40 max-w-full rounded-[4px] border border-[#E9EBEC]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Fixed Footer -->
        <div
          class="border-t border-[#ECECEC] px-8 py-4 flex justify-end gap-3 flex-shrink-0"
        >
          <button
            (click)="onClose()"
            class="px-6 h-9 border-2 border-[#D3D5D6] rounded-[4px] text-[#4C546C] font-semibold hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_323_7393)">
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
                <clipPath id="clip0_323_7393">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Close
          </button>
          <button
            (click)="onSave()"
            [disabled]="!isFormValid()"
            class="px-8 h-9 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded-[4px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
            Save
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddImageGalleryModalComponent {
  @Input() isOpen = false;
  @Input() editingImage: GalleryImage | null = null;
  @Output() save = new EventEmitter<
    Omit<GalleryImage, "id" | "eventId" | "createdAt">
  >();
  @Output() close = new EventEmitter<void>();

  editMode = false;
  productImagePreview: string | null = null;

  formData = {
    title: "",
    imageUrl: "",
    caption: "",
    thumbnailImageUrl: "",
    imageGalleryFor: "",
    viewMoreUrl: "",
    productImageUrl: "",
  };

  ngOnChanges() {
    if (this.isOpen && this.editingImage) {
      this.editMode = true;
      this.formData = {
        title: this.editingImage.title,
        imageUrl: this.editingImage.imageUrl,
        caption: this.editingImage.caption || "",
        thumbnailImageUrl: this.editingImage.thumbnailImageUrl || "",
        imageGalleryFor: this.editingImage.imageGalleryFor || "",
        viewMoreUrl: this.editingImage.viewMoreUrl || "",
        productImageUrl: this.editingImage.productImageUrl || "",
      };
      this.productImagePreview = this.editingImage.productImageUrl || null;
    } else if (this.isOpen && !this.editingImage) {
      this.editMode = false;
      this.resetForm();
    }
  }

  isFormValid(): boolean {
    return this.formData.title.trim() !== "";
  }

  onThumbnailSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.thumbnailImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProductImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productImagePreview = e.target.result;
        this.formData.productImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.isFormValid()) {
      this.save.emit({
        title: this.formData.title,
        imageUrl:
          this.formData.productImageUrl || this.formData.thumbnailImageUrl,
        caption: this.formData.caption || undefined,
        thumbnailImageUrl:
          this.formData.thumbnailImageUrl || undefined,
        imageGalleryFor: this.formData.imageGalleryFor || undefined,
        viewMoreUrl: this.formData.viewMoreUrl || undefined,
        productImageUrl: this.formData.productImageUrl || undefined,
      });
      this.resetForm();
    }
  }

  onClose(): void {
    this.resetForm();
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  private resetForm(): void {
    this.formData = {
      title: "",
      imageUrl: "",
      caption: "",
      thumbnailImageUrl: "",
      imageGalleryFor: "",
      viewMoreUrl: "",
      productImageUrl: "",
    };
    this.productImagePreview = null;
    this.editMode = false;
  }
}
