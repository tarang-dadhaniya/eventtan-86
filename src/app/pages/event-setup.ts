import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { filter } from "rxjs/operators";
import {
  EventDetailSidebarComponent,
  MenuItem,
} from "../components/event-detail-sidebar";
import { AddScheduleModalComponent } from "../components/add-schedule-modal";
import { AddExhibitorModalComponent } from "../components/add-exhibitor-modal";
import { AddSpeakersModalComponent } from "../components/add-speakers-modal";
import { ConfirmDeleteModalComponent } from "../components/confirm-delete-modal";
import { AboutDetailModalComponent } from "../components/about-detail-modal";
import { AddInformationModalComponent } from "../components/add-information-modal";
import { AddSponsorsModalComponent } from "../components/add-sponsors-modal";
import { AddSocialMediaModalComponent } from "../components/add-social-media-modal";
import { ScheduleService, Schedule } from "../services/schedule.service";
import { ExhibitorService, Exhibitor } from "../services/exhibitor.service";
import { SpeakerService, Speaker } from "../services/speaker.service";
import {
  InformationService,
  Information,
} from "../services/information.service";
import { SponsorService, Sponsor } from "../services/sponsor.service";
import {
  SocialMediaService,
  SocialMediaEntry,
} from "../services/social-media.service";
import {
  ImageGalleryService,
  GalleryImage,
} from "../services/image-gallery.service";
import { AddImageGalleryModalComponent } from "../components/add-image-gallery-modal";

const DASHBOARD_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M9.11972 1.77151C8.15614 1.4095 7.09392 1.4095 6.13033 1.77151C5.5251 1.99889 4.94006 2.45532 3.51022 3.59919L1.21855 5.43253C0.895102 5.69128 0.423133 5.63884 0.164376 5.3154C-0.0943811 4.99195 -0.0419401 4.51998 0.281506 4.26122L2.57317 2.42789C2.61283 2.39616 2.65202 2.36481 2.69075 2.33381C3.96492 1.31414 4.74565 0.689359 5.6028 0.367335C6.90647 -0.122445 8.34359 -0.122445 9.64726 0.367335C10.5044 0.689359 11.2851 1.31414 12.5593 2.33381C12.598 2.3648 12.6372 2.39616 12.6769 2.42789L14.9685 4.26122C15.292 4.51998 15.3444 4.99195 15.0857 5.3154C14.8269 5.63884 14.355 5.69128 14.0315 5.43253L11.7398 3.59919C10.31 2.45532 9.72496 1.99889 9.11972 1.77151Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.08565 0.281506C4.34441 0.604953 4.29197 1.07692 3.96852 1.33568L3.51019 1.70235C3.09253 2.03647 2.92421 2.17224 2.77968 2.31347C2.06537 3.01148 1.61969 3.93876 1.52086 4.93259C1.50087 5.13368 1.5 5.34993 1.5 5.88479V11.2C1.5 13.3171 3.21624 15.0334 5.33334 15.0334C5.93164 15.0334 6.41667 14.5483 6.41667 13.95V10.2833C6.41667 8.35031 7.98367 6.78331 9.91667 6.78331C11.8497 6.78331 13.4167 8.35031 13.4167 10.2833V13.95C13.4167 14.5483 13.9017 15.0334 14.5 15.0334C16.6171 15.0334 18.3333 13.3171 18.3333 11.2V5.88479C18.3333 5.34993 18.3325 5.13368 18.3125 4.93259C18.2136 3.93876 17.7679 3.01148 17.0536 2.31347C16.9091 2.17224 16.7408 2.03647 16.3231 1.70235L15.8648 1.33568C15.5413 1.07692 15.4889 0.604953 15.7477 0.281506C16.0064 -0.0419405 16.4784 -0.0943815 16.8018 0.164376L17.2748 0.541868C17.6571 0.856916 17.886 1.04452 18.0782 1.23375C19.0199 2.16224 19.5996 3.40171 19.7171 4.72041C19.7394 4.94668 19.7496 5.18893 19.7543 5.59686L19.75 5.88479V11.2C19.75 14.0997 17.3997 16.45 14.5 16.45C13.1193 16.45 11.9167 15.2473 11.9167 13.8667V10.2C11.9167 9.19579 11.087 8.38331 10.0667 8.38331C9.04634 8.38331 8.21667 9.19579 8.21667 10.2V13.8667C8.21667 15.2473 7.01401 16.45 5.63334 16.45C2.73357 16.45 0.383333 14.0997 0.383333 11.2V5.88479L0.379004 5.59686C0.383737 5.18893 0.393911 4.94668 0.416226 4.72041C0.533719 3.40171 1.11338 2.16224 2.05508 1.23375C2.24733 1.04452 2.47622 0.856916 2.85854 0.541868L3.33152 0.164376C3.65497 -0.0943815 4.12694 -0.0419405 4.38565 0.281506Z" fill="white"/></svg>`;

const EVENT_SETUP_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0ZM3.95 4.58333L3.91957 4.58333H3.91956C3.38541 4.58332 2.93956 4.58331 2.57533 4.61307C2.19545 4.64411 1.83879 4.71122 1.50153 4.88307C0.984081 5.14672 0.563385 5.56741 0.299733 6.08486C0.127889 6.42212 0.0607778 6.77878 0.02974 7.15866C-1.90887e-05 7.5229 -1.02672e-05 7.96874 4.02008e-07 8.5029L7.59636e-07 8.53333V13.125C7.59636e-07 13.5392 0.335787 13.875 0.750001 13.875C1.16421 13.875 1.5 13.5392 1.5 13.125V8.53333C1.5 7.9609 1.50058 7.57669 1.52476 7.28081C1.54822 6.99369 1.5901 6.85641 1.63624 6.76585C1.75608 6.53064 1.94731 6.33942 2.18251 6.21958C2.27307 6.17343 2.41036 6.13155 2.69748 6.10809C2.99336 6.08392 3.37757 6.08333 3.95 6.08333H4.88333C5.45576 6.08333 5.83998 6.08392 6.13586 6.10809C6.42298 6.13155 6.56026 6.17343 6.65082 6.21958C6.88602 6.33942 7.07725 6.53064 7.19709 6.76585C7.24324 6.85641 7.28512 6.99369 7.30858 7.28081C7.33275 7.57669 7.33333 7.96091 7.33333 8.53333V13.125C7.33333 13.5392 7.66912 13.875 8.08333 13.875C8.49755 13.875 8.83333 13.5392 8.83333 13.125V8.53333V8.50293C8.83335 7.96876 8.83335 7.5229 8.80359 7.15866C8.77256 6.77878 8.70545 6.42212 8.53361 6.08486C8.26996 5.56741 7.84926 5.14672 7.33181 4.88307C6.99455 4.71122 6.63788 4.64411 6.25801 4.61307C5.89378 4.58331 5.44793 4.58332 4.91377 4.58333H3.95Z" fill="white"/></svg>`;

const EVENT_OVERVIEW_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0ZM3.95 4.58333L3.91957 4.58333H3.91956C3.38541 4.58332 2.93956 4.58331 2.57533 4.61307C2.19545 4.64411 1.83879 4.71122 1.50153 4.88307C0.984081 5.14672 0.563385 5.56741 0.299733 6.08486C0.127889 6.42212 0.0607778 6.77878 0.02974 7.15866C-1.90887e-05 7.5229 -1.02672e-05 7.96874 4.02008e-07 8.5029L7.59636e-07 8.53333V13.125C7.59636e-07 13.5392 0.335787 13.875 0.750001 13.875C1.16421 13.875 1.5 13.5392 1.5 13.125V8.53333C1.5 7.9609 1.50058 7.57669 1.52476 7.28081C1.54822 6.99369 1.5901 6.85641 1.63624 6.76585C1.75608 6.53064 1.94731 6.33942 2.18251 6.21958C2.27307 6.17343 2.41036 6.13155 2.69748 6.10809C2.99336 6.08392 3.37757 6.08333 3.95 6.08333H4.88333C5.45576 6.08333 5.83998 6.08392 6.13586 6.10809C6.42298 6.13155 6.56026 6.17343 6.65082 6.21958C6.88602 6.33942 7.07725 6.53064 7.19709 6.76585C7.24324 6.85641 7.28512 6.99369 7.30858 7.28081C7.33275 7.57669 7.33333 7.96091 7.33333 8.53333V13.125C7.33333 13.5392 7.66912 13.875 8.08333 13.875C8.49755 13.875 8.83333 13.5392 8.83333 13.125V8.53333V8.50293C8.83335 7.96876 8.83335 7.5229 8.80359 7.15866C8.77256 6.77878 8.70545 6.42212 8.53361 6.08486C8.26996 5.56741 7.84926 5.14672 7.33181 4.88307C6.99455 4.71122 6.63788 4.64411 6.25801 4.61307C5.89378 4.58331 5.44793 4.58332 4.91377 4.58333H3.95Z" fill="white"/></svg>`;

@Component({
  selector: "app-event-setup",
  standalone: true,
  imports: [
    CommonModule,
    EventDetailSidebarComponent,
    FormsModule,
    AddScheduleModalComponent,
    AddExhibitorModalComponent,
    AddSpeakersModalComponent,
    ConfirmDeleteModalComponent,
    AboutDetailModalComponent,
    AddInformationModalComponent,
    AddSponsorsModalComponent,
    AddSocialMediaModalComponent,
    AddImageGalleryModalComponent,
  ],
  template: `
    <div class="flex h-screen overflow-hidden bg-main-bg">
      <app-event-detail-sidebar
        [menuItems]="menuItems"
        [activeRoute]="activeRoute"
        [backButtonLabel]="backButtonLabel"
        (logoutEvent)="onLogout()"
        (backEvent)="onBackToDashboard()"
      ></app-event-detail-sidebar>

      <main class="flex-1 flex flex-col overflow-hidden">
        <header class="h-24 bg-white border-b border-[#ECECEC] px-4 lg:px-8">
          <div class="h-full flex items-center gap-4">
            <button
              class="w-11 h-11 bg-primary-blue rounded flex items-center justify-center lg:hidden hover:bg-[#0385b5] transition-colors"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.5 9C4.5 8.17158 5.17158 7.5 6 7.5H30C30.8284 7.5 31.5 8.17158 31.5 9C31.5 9.82842 30.8284 10.5 30 10.5H6C5.17158 10.5 4.5 9.82842 4.5 9ZM4.5 18C4.5 17.1716 5.17158 16.5 6 16.5H21C21.8284 16.5 22.5 17.1716 22.5 18C22.5 18.8285 21.8284 19.5 21 19.5H6C5.17158 19.5 4.5 18.8285 4.5 18ZM4.5 27C4.5 26.1716 5.17158 25.5 6 25.5H13.5C14.3284 25.5 15 26.1716 15 27C15 27.8285 14.3284 28.5 13.5 28.5H6C5.17158 28.5 4.5 27.8285 4.5 27Z"
                  fill="white"
                />
              </svg>
            </button>

            <div
              class="flex-1 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6"
            >
              <div class="flex items-center gap-3 lg:gap-4">
                <div
                  class="w-11 h-11 bg-[#E8F4F8] rounded flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="15"
                      rx="2"
                      stroke="#009FD8"
                      stroke-width="2"
                    />
                    <path
                      d="M3 8H21"
                      stroke="#009FD8"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M8 3V7"
                      stroke="#009FD8"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16 3V7"
                      stroke="#009FD8"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div class="flex flex-col">
                  <h1
                    class="text-lg lg:text-[22px] font-bold text-[#181C32] tracking-wide"
                  >
                    {{ eventName }}
                  </h1>
                  <p
                    class="text-sm lg:text-base text-[#707070] tracking-wide font-medium"
                  >
                    Event Setup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-auto bg-main-bg">
          <div class="px-4 lg:px-8 py-6 lg:py-8">
            <div class="max-w-[1366px] mx-auto">
              <!-- Tab Navigation -->
              <div class="flex items-center justify-center gap-0 mb-8">
                <button
                  (click)="currentTab = 'details'"
                  [class.active]="currentTab === 'details'"
                  class="tab-button relative flex items-center gap-2 px-6 md:px-10 py-2.5 bg-white border border-[#009FD8] rounded shadow-sm transition-all"
                  [ngClass]="{
                    'bg-[#009FD8] text-white': currentTab === 'details',
                    'bg-white text-[#049AD0]': currentTab !== 'details',
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 9C15.6642 9 16 9.3358 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H12.9502C12.3778 10.5 11.9931 10.5002 11.6973 10.5244C11.4106 10.5479 11.2732 10.5897 11.1826 10.6357C10.9475 10.7556 10.7566 10.9475 10.6367 11.1826C10.5906 11.2732 10.5479 11.4103 10.5244 11.6973C10.5002 11.9931 10.5 12.3778 10.5 12.9502V15.25C10.5 15.6642 10.1642 16 9.75 16C9.33579 16 9 15.6642 9 15.25V12.9502C9 12.4025 8.99897 11.9463 9.0293 11.5752C9.06033 11.1955 9.1281 10.8391 9.2998 10.502C9.56346 9.98452 9.98452 9.56345 10.502 9.2998C10.8391 9.12809 11.1955 9.06033 11.5752 9.0293C11.9463 8.99897 12.4025 9 12.9502 9H15.25ZM2.75 8C3.16421 8 3.5 8.33579 3.5 8.75C3.5 9.16421 3.16421 9.5 2.75 9.5H0.75C0.335786 9.5 0 9.16421 0 8.75C0 8.33579 0.335786 8 0.75 8H2.75ZM6.75 4C7.16421 4 7.5 4.33579 7.5 4.75C7.5 5.16421 7.16421 5.5 6.75 5.5H0.75C0.335786 5.5 0 5.16421 0 4.75C0 4.33579 0.335786 4 0.75 4H6.75ZM8.75 0C9.16421 0 9.5 0.335786 9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.75Z"
                      [attr.fill]="
                        currentTab === 'details' ? 'white' : '#049AD0'
                      "
                    />
                    <path
                      d="M11.1504 0C12.818 -9.06349e-08 14.1143 -0.000828191 15.1523 0.0839844C16.199 0.169528 17.0495 0.345624 17.8145 0.735352C19.0845 1.3825 20.1175 2.41545 20.7646 3.68555C21.1544 4.45049 21.3305 5.30103 21.416 6.34766C21.5008 7.38571 21.5 8.68202 21.5 10.3496V13.9219C21.5 14.2508 21.5004 14.4434 21.4902 14.6309C21.4068 16.1663 20.8012 17.6278 19.7744 18.7725C19.6491 18.9121 19.5128 19.0477 19.2803 19.2803C19.0477 19.5128 18.9121 19.6491 18.7725 19.7744C17.6278 20.8012 16.1663 21.4068 14.6309 21.4902C14.4434 21.5004 14.2508 21.5 13.9219 21.5H10.3496C8.68202 21.5 7.38571 21.5008 6.34766 21.416C5.30103 21.3305 4.45049 21.1544 3.68555 20.7646C2.41545 20.1175 1.3825 19.0845 0.735352 17.8145C0.345624 17.0495 0.169528 16.199 0.0839844 15.1523C-0.000828191 14.1143 -9.06348e-08 12.818 0 11.1504V10.3496C-9.06941e-08 8.68202 -0.000828204 7.38571 0.0839844 6.34766C0.169528 5.30103 0.345624 4.45049 0.735352 3.68555C1.3825 2.41545 2.41545 1.3825 3.68555 0.735352C4.45049 0.345624 5.30103 0.169528 6.34766 0.0839844C7.38571 -0.000828204 8.68202 -9.0694e-08 10.3496 0H11.1504ZM10.3496 1.5C8.65753 1.5 7.43345 1.50047 6.4707 1.5791C5.51657 1.65706 4.8846 1.80814 4.36621 2.07227C3.37859 2.57556 2.57556 3.37859 2.07227 4.36621C1.80814 4.8846 1.65706 5.51657 1.5791 6.4707C1.50047 7.43345 1.5 8.65753 1.5 10.3496V11.1504C1.5 12.8425 1.50047 14.0665 1.5791 15.0293C1.65706 15.9834 1.80814 16.6154 2.07227 17.1338C2.57556 18.1214 3.37859 18.9244 4.36621 19.4277C4.8846 19.6919 5.51657 19.8429 6.4707 19.9209C7.43345 19.9995 8.65753 20 10.3496 20H13.9219C14.2666 20 14.4116 19.9996 14.5488 19.9922C15.7432 19.9274 16.8801 19.4569 17.7705 18.6582C17.873 18.5663 17.9755 18.4639 18.2197 18.2197C18.4639 17.9755 18.5663 17.873 18.6582 17.7705C19.4569 16.8801 19.9274 15.7432 19.9922 14.5488C19.9996 14.4116 20 14.2666 20 13.9219V10.3496C20 8.65753 19.9995 7.43345 19.9209 6.4707C19.8429 5.51657 19.6919 4.8846 19.4277 4.36621C18.9244 3.37859 18.1214 2.57556 17.1338 2.07227C16.6154 1.80814 15.9834 1.65706 15.0293 1.5791C14.0665 1.50047 12.8425 1.5 11.1504 1.5H10.3496Z"
                      [attr.fill]="
                        currentTab === 'details' ? 'white' : '#049AD0'
                      "
                    />
                  </svg>
                  <span
                    class="text-sm md:text-base font-medium md:font-semibold whitespace-nowrap"
                    >Event Details</span
                  >
                </button>

                <div class="h-px w-16 md:w-28 bg-[#049AD0]"></div>

                <button
                  (click)="currentTab = 'features'"
                  [class.active]="currentTab === 'features'"
                  class="tab-button relative flex items-center gap-2 px-6 md:px-10 py-2.5 bg-white border border-[#049AD0] rounded shadow-sm transition-all"
                  [ngClass]="{
                    'bg-[#009FD8] text-white': currentTab === 'features',
                    'bg-white text-[#049AD0]': currentTab !== 'features',
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 9C15.6642 9 16 9.3358 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H12.9502C12.3778 10.5 11.9931 10.5002 11.6973 10.5244C11.4106 10.5479 11.2732 10.5897 11.1826 10.6357C10.9475 10.7556 10.7566 10.9475 10.6367 11.1826C10.5906 11.2732 10.5479 11.4103 10.5244 11.6973C10.5002 11.9931 10.5 12.3778 10.5 12.9502V15.25C10.5 15.6642 10.1642 16 9.75 16C9.33579 16 9 15.6642 9 15.25V12.9502C9 12.4025 8.99897 11.9463 9.0293 11.5752C9.06033 11.1955 9.1281 10.8391 9.2998 10.502C9.56346 9.98452 9.98452 9.56345 10.502 9.2998C10.8391 9.12809 11.1955 9.06033 11.5752 9.0293C11.9463 8.99897 12.4025 9 12.9502 9H15.25ZM2.75 8C3.16421 8 3.5 8.33579 3.5 8.75C3.5 9.16421 3.16421 9.5 2.75 9.5H0.75C0.335786 9.5 0 9.16421 0 8.75C0 8.33579 0.335786 8 0.75 8H2.75ZM6.75 4C7.16421 4 7.5 4.33579 7.5 4.75C7.5 5.16421 7.16421 5.5 6.75 5.5H0.75C0.335786 5.5 0 5.16421 0 4.75C0 4.33579 0.335786 4 0.75 4H6.75ZM8.75 0C9.16421 0 9.5 0.335786 9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.75Z"
                      [attr.fill]="
                        currentTab === 'features' ? 'white' : '#049AD0'
                      "
                    />
                    <path
                      d="M11.1504 0C12.818 -9.06349e-08 14.1143 -0.000828191 15.1523 0.0839844C16.199 0.169528 17.0495 0.345624 17.8145 0.735352C19.0845 1.3825 20.1175 2.41545 20.7646 3.68555C21.1544 4.45049 21.3305 5.30103 21.416 6.34766C21.5008 7.38571 21.5 8.68202 21.5 10.3496V13.9219C21.5 14.2508 21.5004 14.4434 21.4902 14.6309C21.4068 16.1663 20.8012 17.6278 19.7744 18.7725C19.6491 18.9121 19.5128 19.0477 19.2803 19.2803C19.0477 19.5128 18.9121 19.6491 18.7725 19.7744C17.6278 20.8012 16.1663 21.4068 14.6309 21.4902C14.4434 21.5004 14.2508 21.5 13.9219 21.5H10.3496C8.68202 21.5 7.38571 21.5008 6.34766 21.416C5.30103 21.3305 4.45049 21.1544 3.68555 20.7646C2.41545 20.1175 1.3825 19.0845 0.735352 17.8145C0.345624 17.0495 0.169528 16.199 0.0839844 15.1523C-0.000828191 14.1143 -9.06348e-08 12.818 0 11.1504V10.3496C-9.06941e-08 8.68202 -0.000828204 7.38571 0.0839844 6.34766C0.169528 5.30103 0.345624 4.45049 0.735352 3.68555C1.3825 2.41545 2.41545 1.3825 3.68555 0.735352C4.45049 0.345624 5.30103 0.169528 6.34766 0.0839844C7.38571 -0.000828204 8.68202 -9.0694e-08 10.3496 0H11.1504ZM10.3496 1.5C8.65753 1.5 7.43345 1.50047 6.4707 1.5791C5.51657 1.65706 4.8846 1.80814 4.36621 2.07227C3.37859 2.57556 2.57556 3.37859 2.07227 4.36621C1.80814 4.8846 1.65706 5.51657 1.5791 6.4707C1.50047 7.43345 1.5 8.65753 1.5 10.3496V11.1504C1.5 12.8425 1.50047 14.0665 1.5791 15.0293C1.65706 15.9834 1.80814 16.6154 2.07227 17.1338C2.57556 18.1214 3.37859 18.9244 4.36621 19.4277C4.8846 19.6919 5.51657 19.8429 6.4707 19.9209C7.43345 19.9995 8.65753 20 10.3496 20H13.9219C14.2666 20 14.4116 19.9996 14.5488 19.9922C15.7432 19.9274 16.8801 19.4569 17.7705 18.6582C17.873 18.5663 17.9755 18.4639 18.2197 18.2197C18.4639 17.9755 18.5663 17.873 18.6582 17.7705C19.4569 16.8801 19.9274 15.7432 19.9922 14.5488C19.9996 14.4116 20 14.2666 20 13.9219V10.3496C20 8.65753 19.9995 7.43345 19.9209 6.4707C19.8429 5.51657 19.6919 4.8846 19.4277 4.36621C18.9244 3.37859 18.1214 2.57556 17.1338 2.07227C16.6154 1.80814 15.9834 1.65706 15.0293 1.5791C14.0665 1.50047 12.8425 1.5 11.1504 1.5H10.3496Z"
                      [attr.fill]="
                        currentTab === 'features' ? 'white' : '#049AD0'
                      "
                    />
                  </svg>
                  <span
                    class="text-sm md:text-base font-medium md:font-semibold whitespace-nowrap"
                    >Event Features</span
                  >
                </button>

                <div class="h-px w-16 md:w-28 bg-[#CED4DA]"></div>

                <button
                  (click)="currentTab = 'content'"
                  [class.active]="currentTab === 'content'"
                  class="tab-button relative flex items-center gap-2 px-6 md:px-10 py-2.5 bg-white border border-[#049AD0] rounded shadow-sm transition-all"
                  [ngClass]="{
                    'bg-[#009FD8] text-white': currentTab === 'content',
                    'bg-white text-[#049AD0]': currentTab !== 'content',
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 9C15.6642 9 16 9.3358 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H12.9502C12.3778 10.5 11.9931 10.5002 11.6973 10.5244C11.4106 10.5479 11.2732 10.5897 11.1826 10.6357C10.9475 10.7556 10.7566 10.9475 10.6367 11.1826C10.5906 11.2732 10.5479 11.4103 10.5244 11.6973C10.5002 11.9931 10.5 12.3778 10.5 12.9502V15.25C10.5 15.6642 10.1642 16 9.75 16C9.33579 16 9 15.6642 9 15.25V12.9502C9 12.4025 8.99897 11.9463 9.0293 11.5752C9.06033 11.1955 9.1281 10.8391 9.2998 10.502C9.56346 9.98452 9.98452 9.56345 10.502 9.2998C10.8391 9.12809 11.1955 9.06033 11.5752 9.0293C11.9463 8.99897 12.4025 9 12.9502 9H15.25ZM2.75 8C3.16421 8 3.5 8.33579 3.5 8.75C3.5 9.16421 3.16421 9.5 2.75 9.5H0.75C0.335786 9.5 0 9.16421 0 8.75C0 8.33579 0.335786 8 0.75 8H2.75ZM6.75 4C7.16421 4 7.5 4.33579 7.5 4.75C7.5 5.16421 7.16421 5.5 6.75 5.5H0.75C0.335786 5.5 0 5.16421 0 4.75C0 4.33579 0.335786 4 0.75 4H6.75ZM8.75 0C9.16421 0 9.5 0.335786 9.5 0.75C9.5 1.16421 9.16421 1.5 8.75 1.5H0.75C0.335786 1.5 0 1.16421 0 0.75C0 0.335786 0.335786 0 0.75 0H8.75Z"
                      [attr.fill]="
                        currentTab === 'content' ? 'white' : '#049AD0'
                      "
                    />
                    <path
                      d="M11.1504 0C12.818 -9.06349e-08 14.1143 -0.000828191 15.1523 0.0839844C16.199 0.169528 17.0495 0.345624 17.8145 0.735352C19.0845 1.3825 20.1175 2.41545 20.7646 3.68555C21.1544 4.45049 21.3305 5.30103 21.416 6.34766C21.5008 7.38571 21.5 8.68202 21.5 10.3496V13.9219C21.5 14.2508 21.5004 14.4434 21.4902 14.6309C21.4068 16.1663 20.8012 17.6278 19.7744 18.7725C19.6491 18.9121 19.5128 19.0477 19.2803 19.2803C19.0477 19.5128 18.9121 19.6491 18.7725 19.7744C17.6278 20.8012 16.1663 21.4068 14.6309 21.4902C14.4434 21.5004 14.2508 21.5 13.9219 21.5H10.3496C8.68202 21.5 7.38571 21.5008 6.34766 21.416C5.30103 21.3305 4.45049 21.1544 3.68555 20.7646C2.41545 20.1175 1.3825 19.0845 0.735352 17.8145C0.345624 17.0495 0.169528 16.199 0.0839844 15.1523C-0.000828191 14.1143 -9.06348e-08 12.818 0 11.1504V10.3496C-9.06941e-08 8.68202 -0.000828204 7.38571 0.0839844 6.34766C0.169528 5.30103 0.345624 4.45049 0.735352 3.68555C1.3825 2.41545 2.41545 1.3825 3.68555 0.735352C4.45049 0.345624 5.30103 0.169528 6.34766 0.0839844C7.38571 -0.000828204 8.68202 -9.0694e-08 10.3496 0H11.1504ZM10.3496 1.5C8.65753 1.5 7.43345 1.50047 6.4707 1.5791C5.51657 1.65706 4.8846 1.80814 4.36621 2.07227C3.37859 2.57556 2.57556 3.37859 2.07227 4.36621C1.80814 4.8846 1.65706 5.51657 1.5791 6.4707C1.50047 7.43345 1.5 8.65753 1.5 10.3496V11.1504C1.5 12.8425 1.50047 14.0665 1.5791 15.0293C1.65706 15.9834 1.80814 16.6154 2.07227 17.1338C2.57556 18.1214 3.37859 18.9244 4.36621 19.4277C4.8846 19.6919 5.51657 19.8429 6.4707 19.9209C7.43345 19.9995 8.65753 20 10.3496 20H13.9219C14.2666 20 14.4116 19.9996 14.5488 19.9922C15.7432 19.9274 16.8801 19.4569 17.7705 18.6582C17.873 18.5663 17.9755 18.4639 18.2197 18.2197C18.4639 17.9755 18.5663 17.873 18.6582 17.7705C19.4569 16.8801 19.9274 15.7432 19.9922 14.5488C19.9996 14.4116 20 14.2666 20 13.9219V10.3496C20 8.65753 19.9995 7.43345 19.9209 6.4707C19.8429 5.51657 19.6919 4.8846 19.4277 4.36621C18.9244 3.37859 18.1214 2.57556 17.1338 2.07227C16.6154 1.80814 15.9834 1.65706 15.0293 1.5791C14.0665 1.50047 12.8425 1.5 11.1504 1.5H10.3496Z"
                      [attr.fill]="
                        currentTab === 'content' ? 'white' : '#049AD0'
                      "
                    />
                  </svg>
                  <span
                    class="text-sm md:text-base font-medium md:font-semibold whitespace-nowrap"
                    >Features Content</span
                  >
                </button>
              </div>

              <!-- Event Details Tab Content -->
              <div
                *ngIf="currentTab === 'details'"
                class="bg-white rounded shadow-md border border-[#E9E9E9] p-4 md:p-6 lg:p-8"
              >
                <!-- Logo and Banner Section -->
                <div
                  class="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-4 lg:gap-6 mb-6"
                >
                  <!-- Logo Upload -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Logo</label
                    >
                    <div
                      class="w-full h-48 md:h-56 lg:h-64 border border-[#CED4DA] rounded flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                      (click)="logoInput.click()"
                    >
                      <img
                        *ngIf="logoPreview"
                        [src]="logoPreview"
                        alt="Logo preview"
                        class="w-full h-full object-contain rounded"
                      />
                      <div
                        *ngIf="!logoPreview"
                        class="flex flex-col items-center justify-center text-gray-400"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="mb-2"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span class="text-sm">Click to upload logo</span>
                      </div>
                    </div>
                    <input
                      #logoInput
                      type="file"
                      accept="image/*"
                      class="hidden"
                      (change)="onLogoChange($event)"
                    />
                  </div>

                  <!-- Banner Upload -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Banner</label
                    >
                    <div
                      class="w-full h-48 md:h-56 lg:h-64 border border-[#CED4DA] rounded flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                      (click)="bannerInput.click()"
                    >
                      <img
                        *ngIf="bannerPreview"
                        [src]="bannerPreview"
                        alt="Banner preview"
                        class="w-full h-full object-cover rounded"
                      />
                      <div
                        *ngIf="!bannerPreview"
                        class="flex flex-col items-center justify-center text-gray-400"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class="mb-2"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span class="text-sm">Click to upload banner</span>
                      </div>
                    </div>
                    <input
                      #bannerInput
                      type="file"
                      accept="image/*"
                      class="hidden"
                      (change)="onBannerChange($event)"
                    />
                  </div>
                </div>

                <!-- Event Name Input -->
                <div class="flex flex-col mb-6">
                  <label class="text-base font-medium text-[#878A99] mb-2"
                    >Name of the Event</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="formData.eventName"
                    placeholder="14th Engimach"
                    class="w-full h-10 px-4 border border-[#CED4DA] rounded text-base text-[#686868] placeholder-[#686868] focus:outline-none focus:border-[#049AD0] transition-colors"
                  />
                </div>

                <!-- Welcome Message -->
                <div class="flex flex-col mb-6">
                  <label class="text-base font-medium text-[#878A99] mb-2"
                    >Welcome Message</label
                  >
                  <div class="border border-[#CED4DA] rounded">
                    <!-- Toolbar -->
                    <div
                      class="flex flex-wrap items-center gap-1 p-2 border-b border-[#CED4DA] bg-white rounded-t"
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
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5 6.25H4.88438L7.12625 4.00875L6.25 3.125L2.5 6.875L6.25 10.625L7.12625 9.74063L4.88625 7.5H12.5C13.4946 7.5 14.4484 7.89509 15.1517 8.59835C15.8549 9.30161 16.25 10.2554 16.25 11.25C16.25 12.2446 15.8549 13.1984 15.1517 13.9017C14.4484 14.6049 13.4946 15 12.5 15H7.5V16.25H12.5C13.8261 16.25 15.0979 15.7232 16.0355 14.7855C16.9732 13.8479 17.5 12.5761 17.5 11.25C17.5 9.92392 16.9732 8.65215 16.0355 7.71447C15.0979 6.77678 13.8261 6.25 12.5 6.25Z"
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
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.5 6.25H15.1156L12.8737 4.00875L13.75 3.125L17.5 6.875L13.75 10.625L12.8737 9.74063L15.1137 7.5H7.5C6.50544 7.5 5.55161 7.89509 4.84835 8.59835C4.14509 9.30161 3.75 10.2554 3.75 11.25C3.75 12.2446 4.14509 13.1984 4.84835 13.9017C5.55161 14.6049 6.50544 15 7.5 15H12.5V16.25H7.5C6.17392 16.25 4.90215 15.7232 3.96447 14.7855C3.02678 13.8479 2.5 12.5761 2.5 11.25C2.5 9.92392 3.02678 8.65215 3.96447 7.71447C4.90215 6.77678 6.17392 6.25 7.5 6.25V6.25Z"
                              fill="#212529"
                            />
                          </svg>
                        </button>
                      </div>

                      <!-- Text Style -->
                      <div
                        class="flex items-center border-r border-[#E9ECEF] pr-2"
                      >
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
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 11L3 6.00005L3.7 5.30005L8 9.60005L12.3 5.30005L13 6.00005L8 11Z"
                              fill="#212529"
                            />
                          </svg>
                        </button>
                      </div>

                      <!-- Text Formatting -->
                      <div
                        class="flex items-center gap-0.5 border-r border-[#E9ECEF] pr-2"
                      >
                        <button
                          type="button"
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
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
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
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
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
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
                              d="M2.5 16.25H17.5V17.5H2.5V16.25ZM10 14.375C8.83968 14.375 7.72688 13.9141 6.90641 13.0936C6.08594 12.2731 5.625 11.1603 5.625 10V3.125H6.875V10C6.875 10.8288 7.20424 11.6237 7.79029 12.2097C8.37634 12.7958 9.1712 13.125 10 13.125C10.8288 13.125 11.6237 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10V3.125H14.375V10C14.375 11.1603 13.9141 12.2731 13.0936 13.0936C12.2731 13.9141 11.1603 14.375 10 14.375V14.375Z"
                              fill="#212529"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
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
                      </div>

                      <!-- Lists -->
                      <div
                        class="flex items-center gap-0.5 border-r border-[#E9ECEF] pr-2"
                      >
                        <button
                          type="button"
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Bulleted List"
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
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Numbered List"
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
                      </div>

                      <!-- Additional Options -->
                      <div class="flex items-center gap-0.5">
                        <button
                          type="button"
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Insert Link"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.2813 4.22503C17.9329 3.87543 17.5189 3.59804 17.0631 3.40877C16.6073 3.2195 16.1186 3.12207 15.625 3.12207C15.1315 3.12207 14.6428 3.2195 14.187 3.40877C13.7312 3.59804 13.3172 3.87543 12.9688 4.22503L13.8563 5.11253C14.089 4.87984 14.3652 4.69526 14.6692 4.56934C14.9733 4.44341 15.2991 4.37859 15.6282 4.37859C15.9572 4.37859 16.2831 4.44341 16.5871 4.56934C16.8911 4.69526 17.1674 4.87984 17.4 5.11253C17.6327 5.34521 17.8173 5.62145 17.9432 5.92547C18.0692 6.22949 18.134 6.55533 18.134 6.8844C18.134 7.21347 18.0692 7.53931 17.9432 7.84333C17.8173 8.14735 17.6327 8.42359 17.4 8.65628L12.4 13.6563C11.9309 14.1262 11.2944 14.3905 10.6304 14.3911C9.96638 14.3917 9.32935 14.1285 8.85942 13.6594C8.38949 13.1903 8.12515 12.5537 8.12457 11.8897C8.12398 11.2257 8.38719 10.5887 8.85629 10.1188L9.73754 9.23128L8.85629 8.34378L7.96879 9.23128C7.61919 9.57966 7.3418 9.99364 7.15253 10.4495C6.96326 10.9053 6.86583 11.394 6.86583 11.8875C6.86583 12.3811 6.96326 12.8698 7.15253 13.3256C7.3418 13.7814 7.61919 14.1954 7.96879 14.5438C8.67597 15.2419 9.63134 15.6308 10.625 15.625C11.1205 15.6271 11.6114 15.5309 12.0695 15.3421C12.5276 15.1533 12.9437 14.8756 13.2938 14.525L18.2938 9.52503C18.9944 8.82025 19.3866 7.86619 19.3842 6.87244C19.3819 5.87869 18.9852 4.9265 18.2813 4.22503Z"
                              fill="#212529"
                            />
                            <path
                              d="M2.61879 15.5125C2.38541 15.2802 2.20022 15.0041 2.07386 14.7C1.94749 14.396 1.88244 14.0699 1.88244 13.7407C1.88244 13.4114 1.94749 13.0853 2.07386 12.7813C2.20022 12.4772 2.38541 12.2011 2.61879 11.9688L7.61879 6.96878C7.85109 6.7354 8.1272 6.55021 8.43127 6.42384C8.73534 6.29748 9.06138 6.23243 9.39067 6.23243C9.71995 6.23243 10.046 6.29748 10.3501 6.42384C10.6541 6.55021 10.9302 6.7354 11.1625 6.96878C11.3944 7.2029 11.577 7.48119 11.6994 7.78716C11.8218 8.09313 11.8815 8.42055 11.875 8.75003C11.8769 9.08053 11.8133 9.40813 11.6878 9.71388C11.5623 10.0196 11.3774 10.2974 11.1438 10.5313L9.81879 11.875L10.7063 12.7625L12.0313 11.4375C12.7366 10.7322 13.1328 9.77561 13.1328 8.77815C13.1328 7.78069 12.7366 6.82409 12.0313 6.11878C11.326 5.41347 10.3694 5.01723 9.37192 5.01723C8.37446 5.01723 7.41785 5.41347 6.71254 6.11878L1.71254 11.1188C1.362 11.4673 1.08382 11.8816 0.893994 12.338C0.704168 12.7944 0.606445 13.2839 0.606445 13.7782C0.606445 14.2725 0.704168 14.7619 0.893994 15.2183C1.08382 15.6747 1.362 16.089 1.71254 16.4375C2.42431 17.1303 3.38185 17.5124 4.37504 17.5C5.37698 17.501 6.33862 17.1055 7.05004 16.4L6.16254 15.5125C5.93025 15.7459 5.65413 15.9311 5.35006 16.0575C5.04599 16.1838 4.71995 16.2489 4.39067 16.2489C4.06138 16.2489 3.73534 16.1838 3.43127 16.0575C3.1272 15.9311 2.85109 15.7459 2.61879 15.5125Z"
                              fill="#212529"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Insert Image"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.875 8.75C12.2458 8.75 12.6084 8.64003 12.9167 8.43401C13.225 8.22798 13.4654 7.93514 13.6073 7.59253C13.7492 7.24992 13.7863 6.87292 13.714 6.50921C13.6416 6.14549 13.463 5.8114 13.2008 5.54917C12.9386 5.28695 12.6045 5.10837 12.2408 5.03603C11.8771 4.96368 11.5001 5.00081 11.1575 5.14273C10.8149 5.28464 10.522 5.52496 10.316 5.83331C10.11 6.14165 10 6.50416 10 6.875C10 7.37228 10.1975 7.84919 10.5492 8.20083C10.9008 8.55246 11.3777 8.75 11.875 8.75ZM11.875 6.25C11.9986 6.25 12.1195 6.28666 12.2222 6.35533C12.325 6.42401 12.4051 6.52162 12.4524 6.63582C12.4997 6.75003 12.5121 6.87569 12.488 6.99693C12.4639 7.11817 12.4044 7.22953 12.3169 7.31694C12.2295 7.40435 12.1182 7.46388 11.9969 7.48799C11.8757 7.51211 11.75 7.49973 11.6358 7.45242C11.5216 7.40512 11.424 7.32501 11.3553 7.22223C11.2867 7.11945 11.25 6.99861 11.25 6.875C11.25 6.70924 11.3158 6.55027 11.4331 6.43306C11.5503 6.31585 11.7092 6.25 11.875 6.25Z"
                              fill="#212529"
                            />
                            <path
                              d="M16.25 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM16.25 16.25H3.75V12.5L6.875 9.375L10.3688 12.8688C10.603 13.1016 10.9198 13.2322 11.25 13.2322C11.5802 13.2322 11.897 13.1016 12.1312 12.8688L13.125 11.875L16.25 15V16.25ZM16.25 13.2313L14.0062 10.9875C13.772 10.7547 13.4552 10.624 13.125 10.624C12.7948 10.624 12.478 10.7547 12.2438 10.9875L11.25 11.9813L7.75625 8.4875C7.52205 8.25469 7.20523 8.12401 6.875 8.12401C6.54477 8.12401 6.22795 8.25469 5.99375 8.4875L3.75 10.7313V3.75H16.25V13.2313Z"
                              fill="#212529"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          class="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Insert Code"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.375 10L15 14.375L14.1188 13.4938L17.6063 10L14.1188 6.50625L15 5.625L19.375 10ZM0.625 10L5 5.625L5.88125 6.50625L2.39375 10L5.88125 13.4938L5 14.375L0.625 10ZM7.7625 15.9275L11.025 3.75L12.2325 4.07313L8.97 16.25L7.7625 15.9275Z"
                              fill="#212529"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- Text Area -->
                    <textarea
                      [(ngModel)]="formData.welcomeMessage"
                      rows="5"
                      class="w-full px-4 py-3 text-base text-[#686868] focus:outline-none resize-none"
                      placeholder="Enter welcome message..."
                    ></textarea>
                  </div>
                </div>

                <!-- Banner Type and Visibility -->
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6"
                >
                  <!-- Banner Type -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Banner Type</label
                    >
                    <div class="relative">
                      <select
                        [(ngModel)]="formData.bannerType"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                      >
                        <option value="Banner">Banner</option>
                        <option value="Carousel">Carousel</option>
                        <option value="Hero">Hero</option>
                        <option value="Video">Video</option>
                      </select>
                      <svg
                        class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- Visibility -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Visibility</label
                    >
                    <div class="relative">
                      <select
                        [(ngModel)]="formData.visibility"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Unlisted">Unlisted</option>
                      </select>
                      <svg
                        class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Date and Time Zone -->
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6"
                >
                  <!-- Start Date -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Start Date</label
                    >
                    <div class="relative">
                      <input
                        type="text"
                        [(ngModel)]="formData.startDate"
                        placeholder="DD/MM/YYYY"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] placeholder-[#686868] focus:outline-none focus:border-[#049AD0] transition-colors"
                      />
                      <svg
                        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.417 0C12.8311 0.000163342 13.167 0.335887 13.167 0.75V0.857422C13.3568 0.865322 13.5359 0.875826 13.7051 0.889648C14.4184 0.947933 15.0221 1.06982 15.5732 1.35059C16.4669 1.80594 17.194 2.53312 17.6494 3.42676C17.9301 3.97775 18.0511 4.58183 18.1094 5.29492C18.1669 5.99946 18.167 6.8759 18.167 7.9834V11.8496C18.167 12.9572 18.1669 13.8335 18.1094 14.5381C18.0511 15.2513 17.9301 15.8552 17.6494 16.4062C17.194 17.3 16.467 18.027 15.5732 18.4824C15.0221 18.7632 14.4184 18.8841 13.7051 18.9424C13.0004 19 12.1243 19 11.0166 19H7.15039C6.04275 19 5.16652 18.9999 4.46191 18.9424C3.7487 18.8841 3.14482 18.7631 2.59375 18.4824C1.70006 18.027 0.972952 17.3 0.517578 16.4062C0.236853 15.8552 0.114921 15.2513 0.0566406 14.5381C-0.000903357 13.8335 0 12.9572 0 11.8496V7.9834C-1.78363e-07 6.87593 -0.000907578 5.99945 0.0566406 5.29492C0.114929 4.58177 0.236863 3.97779 0.517578 3.42676C0.972985 2.5331 1.70006 1.80594 2.59375 1.35059C3.14483 1.06987 3.74867 0.947923 4.46191 0.889648C4.6311 0.875829 4.81019 0.865322 5 0.857422V0.75C5 0.335794 5.3358 1.23633e-05 5.75 0C6.16421 -1.50882e-08 6.5 0.335786 6.5 0.75V0.835938C6.70748 0.835507 6.92411 0.833008 7.15039 0.833008H11.0166C11.2429 0.833008 11.4595 0.835509 11.667 0.835938V0.75C11.667 0.335786 12.0028 1.50882e-08 12.417 0ZM6.5 2.33594V3.25C6.5 3.66421 6.16421 4 5.75 4C5.3358 3.99999 5 3.66421 5 3.25V2.36035C4.85289 2.36708 4.71462 2.37409 4.58398 2.38477C3.96343 2.43547 3.57887 2.5324 3.27441 2.6875C2.66313 2.99902 2.16606 3.49617 1.85449 4.10742C1.69938 4.41184 1.60247 4.79655 1.55176 5.41699C1.50035 6.0463 1.5 6.85116 1.5 7.9834V11.8496C1.5 12.9819 1.50036 13.7867 1.55176 14.416C1.60245 15.0363 1.69945 15.4212 1.85449 15.7256C2.16606 16.3368 2.66314 16.834 3.27441 17.1455C3.57888 17.3006 3.96339 17.3966 4.58398 17.4473C5.21335 17.4987 6.01796 17.5 7.15039 17.5H11.0166C12.1491 17.5 12.9536 17.4987 13.583 17.4473C14.2035 17.3966 14.5881 17.3006 14.8926 17.1455C15.5038 16.834 16.001 16.3368 16.3125 15.7256C16.4675 15.4212 16.5636 15.0363 16.6143 14.416C16.6657 13.7867 16.667 12.9819 16.667 11.8496V7.9834C16.667 6.85113 16.6657 6.0463 16.6143 5.41699C16.5635 4.79656 16.4676 4.41184 16.3125 4.10742C16.001 3.4962 15.5038 2.99905 14.8926 2.6875C14.5882 2.53243 14.2034 2.43547 13.583 2.38477C13.4524 2.37409 13.3141 2.36708 13.167 2.36035V3.25C13.167 3.66411 12.8311 3.99984 12.417 4C12.0028 4 11.667 3.66421 11.667 3.25V2.33594C11.4629 2.33549 11.2465 2.33301 11.0166 2.33301H7.15039C6.92051 2.33301 6.70414 2.33548 6.5 2.33594ZM5.75 13.25C6.21013 13.25 6.58283 13.6229 6.58301 14.083C6.58301 14.5432 6.21024 14.917 5.75 14.917C5.28977 14.917 4.91699 14.5432 4.91699 14.083C4.91717 13.6229 5.28988 13.25 5.75 13.25ZM9.08301 13.25C9.54314 13.25 9.91682 13.6229 9.91699 14.083C9.91699 14.5432 9.54325 14.917 9.08301 14.917C8.62293 14.9168 8.25 14.5431 8.25 14.083C8.25018 13.623 8.62304 13.2502 9.08301 13.25ZM12.417 13.25C12.877 13.2502 13.2498 13.623 13.25 14.083C13.25 14.5431 12.8771 14.9168 12.417 14.917C11.9568 14.917 11.583 14.5432 11.583 14.083C11.5832 13.6229 11.9569 13.25 12.417 13.25ZM5.75 9.91699C6.21024 9.91699 6.58301 10.2898 6.58301 10.75C6.58301 11.2102 6.21024 11.583 5.75 11.583C5.28977 11.583 4.91699 11.2102 4.91699 10.75C4.91699 10.2898 5.28977 9.917 5.75 9.91699ZM9.08301 9.91699C9.54324 9.91699 9.91699 10.2898 9.91699 10.75C9.91699 11.2102 9.54325 11.583 9.08301 11.583C8.62293 11.5828 8.25 11.2101 8.25 10.75C8.25 10.2899 8.62293 9.91718 9.08301 9.91699ZM12.417 9.91699C12.8771 9.91716 13.25 10.2899 13.25 10.75C13.25 11.2101 12.8771 11.5828 12.417 11.583C11.9568 11.583 11.583 11.2102 11.583 10.75C11.583 10.2898 11.9568 9.91699 12.417 9.91699ZM13.25 5.83301C13.664 5.83317 13.9998 6.16904 14 6.58301C14 6.99712 13.6641 7.33284 13.25 7.33301H4.91699C4.50278 7.33301 4.16699 6.99722 4.16699 6.58301C4.16717 6.16894 4.50289 5.83301 4.91699 5.83301H13.25Z"
                          fill="#686868"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- End Date -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >End Date</label
                    >
                    <div class="relative">
                      <input
                        type="text"
                        [(ngModel)]="formData.endDate"
                        placeholder="DD/MM/YYYY"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] placeholder-[#686868] focus:outline-none focus:border-[#049AD0] transition-colors"
                      />
                      <svg
                        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="20"
                        height="20"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.417 0C12.8311 0.000163342 13.167 0.335887 13.167 0.75V0.857422C13.3568 0.865322 13.5359 0.875826 13.7051 0.889648C14.4184 0.947933 15.0221 1.06982 15.5732 1.35059C16.4669 1.80594 17.194 2.53312 17.6494 3.42676C17.9301 3.97775 18.0511 4.58183 18.1094 5.29492C18.1669 5.99946 18.167 6.8759 18.167 7.9834V11.8496C18.167 12.9572 18.1669 13.8335 18.1094 14.5381C18.0511 15.2513 17.9301 15.8552 17.6494 16.4062C17.194 17.3 16.467 18.027 15.5732 18.4824C15.0221 18.7632 14.4184 18.8841 13.7051 18.9424C13.0004 19 12.1243 19 11.0166 19H7.15039C6.04275 19 5.16652 18.9999 4.46191 18.9424C3.7487 18.8841 3.14482 18.7631 2.59375 18.4824C1.70006 18.027 0.972952 17.3 0.517578 16.4062C0.236853 15.8552 0.114921 15.2513 0.0566406 14.5381C-0.000903357 13.8335 0 12.9572 0 11.8496V7.9834C-1.78363e-07 6.87593 -0.000907578 5.99945 0.0566406 5.29492C0.114929 4.58177 0.236863 3.97779 0.517578 3.42676C0.972985 2.5331 1.70006 1.80594 2.59375 1.35059C3.14483 1.06987 3.74867 0.947923 4.46191 0.889648C4.6311 0.875829 4.81019 0.865322 5 0.857422V0.75C5 0.335794 5.3358 1.23633e-05 5.75 0C6.16421 -1.50882e-08 6.5 0.335786 6.5 0.75V0.835938C6.70748 0.835507 6.92411 0.833008 7.15039 0.833008H11.0166C11.2429 0.833008 11.4595 0.835509 11.667 0.835938V0.75C11.667 0.335786 12.0028 1.50882e-08 12.417 0ZM6.5 2.33594V3.25C6.5 3.66421 6.16421 4 5.75 4C5.3358 3.99999 5 3.66421 5 3.25V2.36035C4.85289 2.36708 4.71462 2.37409 4.58398 2.38477C3.96343 2.43547 3.57887 2.5324 3.27441 2.6875C2.66313 2.99902 2.16606 3.49617 1.85449 4.10742C1.69938 4.41184 1.60247 4.79655 1.55176 5.41699C1.50035 6.0463 1.5 6.85116 1.5 7.9834V11.8496C1.5 12.9819 1.50036 13.7867 1.55176 14.416C1.60245 15.0363 1.69945 15.4212 1.85449 15.7256C2.16606 16.3368 2.66314 16.834 3.27441 17.1455C3.57888 17.3006 3.96339 17.3966 4.58398 17.4473C5.21335 17.4987 6.01796 17.5 7.15039 17.5H11.0166C12.1491 17.5 12.9536 17.4987 13.583 17.4473C14.2035 17.3966 14.5881 17.3006 14.8926 17.1455C15.5038 16.834 16.001 16.3368 16.3125 15.7256C16.4675 15.4212 16.5636 15.0363 16.6143 14.416C16.6657 13.7867 16.667 12.9819 16.667 11.8496V7.9834C16.667 6.85113 16.6657 6.0463 16.6143 5.41699C16.5635 4.79656 16.4676 4.41184 16.3125 4.10742C16.001 3.4962 15.5038 2.99905 14.8926 2.6875C14.5882 2.53243 14.2034 2.43547 13.583 2.38477C13.4524 2.37409 13.3141 2.36708 13.167 2.36035V3.25C13.167 3.66411 12.8311 3.99984 12.417 4C12.0028 4 11.667 3.66421 11.667 3.25V2.33594C11.4629 2.33549 11.2465 2.33301 11.0166 2.33301H7.15039C6.92051 2.33301 6.70414 2.33548 6.5 2.33594ZM5.75 13.25C6.21013 13.25 6.58283 13.6229 6.58301 14.083C6.58301 14.5432 6.21024 14.917 5.75 14.917C5.28977 14.917 4.91699 14.5432 4.91699 14.083C4.91717 13.6229 5.28988 13.25 5.75 13.25ZM9.08301 13.25C9.54314 13.25 9.91682 13.6229 9.91699 14.083C9.91699 14.5432 9.54325 14.917 9.08301 14.917C8.62293 14.9168 8.25 14.5431 8.25 14.083C8.25018 13.623 8.62304 13.2502 9.08301 13.25ZM12.417 13.25C12.877 13.2502 13.2498 13.623 13.25 14.083C13.25 14.5431 12.8771 14.9168 12.417 14.917C11.9568 14.917 11.583 14.5432 11.583 14.083C11.5832 13.6229 11.9569 13.25 12.417 13.25ZM5.75 9.91699C6.21024 9.91699 6.58301 10.2898 6.58301 10.75C6.58301 11.2102 6.21024 11.583 5.75 11.583C5.28977 11.583 4.91699 11.2102 4.91699 10.75C4.91699 10.2898 5.28977 9.917 5.75 9.91699ZM9.08301 9.91699C9.54324 9.91699 9.91699 10.2898 9.91699 10.75C9.91699 11.2102 9.54325 11.583 9.08301 11.583C8.62293 11.5828 8.25 11.2101 8.25 10.75C8.25 10.2899 8.62293 9.91718 9.08301 9.91699ZM12.417 9.91699C12.8771 9.91716 13.25 10.2899 13.25 10.75C13.25 11.2101 12.8771 11.5828 12.417 11.583C11.9568 11.583 11.583 11.2102 11.583 10.75C11.583 10.2898 11.9568 9.91699 12.417 9.91699ZM13.25 5.83301C13.664 5.83317 13.9998 6.16904 14 6.58301C14 6.99712 13.6641 7.33284 13.25 7.33301H4.91699C4.50278 7.33301 4.16699 6.99722 4.16699 6.58301C4.16717 6.16894 4.50289 5.83301 4.91699 5.83301H13.25Z"
                          fill="#686868"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- Time Zone -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Time Zone</label
                    >
                    <div class="relative">
                      <select
                        [(ngModel)]="formData.timeZone"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                      >
                        <option value="(GMT+05:30) Mumbai">
                          (GMT+05:30) Mumbai
                        </option>
                        <option value="(GMT+05:30) Kolkata">
                          (GMT+05:30) Kolkata
                        </option>
                        <option value="(GMT+05:30) Delhi">
                          (GMT+05:30) Delhi
                        </option>
                        <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                        <option value="(GMT-05:00) New York">
                          (GMT-05:00) New York
                        </option>
                        <option value="(GMT+01:00) London">
                          (GMT+01:00) London
                        </option>
                      </select>
                      <svg
                        class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1L6 6L11 1"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Venue -->
                <div class="flex flex-col mb-6">
                  <label class="text-base font-medium text-[#878A99] mb-2"
                    >Venue</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="formData.venue"
                    placeholder="Enter venue address"
                    class="w-full h-10 px-4 border border-[#CED4DA] rounded text-base text-[#686868] placeholder-[#686868] focus:outline-none focus:border-[#049AD0] transition-colors"
                  />
                </div>

                <!-- City, State, Country -->
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6"
                >
                  <!-- City -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >City</label
                    >
                    <div class="relative">
                      <select
                        [(ngModel)]="formData.city"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                      >
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Surat">Surat</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Rajkot">Rajkot</option>
                      </select>
                      <svg
                        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- State -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >State</label
                    >
                    <div class="relative">
                      <select
                        [(ngModel)]="formData.state"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                      >
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                      <svg
                        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- Country -->
                  <div class="flex flex-col">
                    <label class="text-base font-medium text-[#878A99] mb-2"
                      >Country</label
                    >
                    <div class="relative">
                      <select
                        [(ngModel)]="formData.country"
                        class="w-full h-10 px-4 pr-10 border border-[#CED4DA] rounded text-base text-[#686868] focus:outline-none focus:border-[#049AD0] appearance-none bg-white transition-colors"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                      <svg
                        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Footer with divider and Next button -->
                <div class="pt-6 border-t border-[#CED4DA]">
                  <div class="flex justify-end">
                    <button
                      (click)="onNext()"
                      class="flex items-center gap-2 px-5 py-2 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors"
                    >
                      <span>Next</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 9H14.25"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 3.75L14.25 9L9 14.25"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Event Features Tab Content -->
              <div
                *ngIf="currentTab === 'features'"
                class="bg-white rounded shadow-md border border-[#E9E9E9] p-4 md:p-6 lg:p-8"
              >
                <!-- Available Label -->
                <h3 class="text-base font-medium text-[#686868] mb-3">
                  Available
                </h3>

                <!-- Features Grid -->
                <div
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 md:gap-6 mb-6"
                >
                  <!-- Schedule - Active -->
                  <div
                    draggable="true"
                    (dragstart)="onDragStartFeature($event, 'schedule')"
                    (dragend)="onDragEndFeature($event)"
                    [class.feature-active]="isFeatureActive('schedule')"
                    class="feature-card group flex flex-col items-center gap-2 p-4 rounded border border-[#049AD0] shadow-sm transition-all hover:shadow-md cursor-grab active:cursor-grabbing"
                  >
                    <div class="relative w-full">
                      <svg
                        class="w-8 h-8 mx-auto"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28.25 2.5H26.75V0H24.25V2.5H7.75V0H5.25V2.5H3.75C1.68225 2.5 0 4.18225 0 6.25V28.25C0 30.3177 1.68225 32 3.75 32H28.25C30.3177 32 32 30.3177 32 28.25V6.25C32 4.18225 30.3177 2.5 28.25 2.5ZM29.5 28.25C29.5 28.9393 28.9393 29.5 28.25 29.5H3.75C3.06075 29.5 2.5 28.9393 2.5 28.25V11.75H29.5V28.25ZM29.5 9.25H2.5V6.25C2.5 5.56075 3.06075 5 3.75 5H5.25V7.5H7.75V5H24.25V7.5H26.75V5H28.25C28.9393 5 29.5 5.56075 29.5 6.25V9.25Z"
                          [attr.fill]="
                            isFeatureActive('schedule') ? '#FFFFFF' : '#049AD0'
                          "
                        />
                      </svg>
                      <button
                        class="absolute -top-2 -right-2 p-1"
                        (click)="$event.stopPropagation()"
                      >
                        <svg
                          class="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                            [attr.stroke]="
                              isFeatureActive('schedule')
                                ? '#FFFFFF'
                                : '#686868'
                            "
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                            [attr.stroke]="
                              isFeatureActive('schedule')
                                ? '#FFFFFF'
                                : '#686868'
                            "
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                            [attr.stroke]="
                              isFeatureActive('schedule')
                                ? '#FFFFFF'
                                : '#686868'
                            "
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <span
                      class="text-sm md:text-base font-medium text-center"
                      [class.text-white]="isFeatureActive('schedule')"
                      [class.text-[#049AD0]]="!isFeatureActive('schedule')"
                    >
                      Schedule
                    </span>
                  </div>

                  <!-- Other Features (Inactive) -->
                  <div
                    *ngFor="let feature of inactiveFeatures"
                    draggable="true"
                    (dragstart)="onDragStartFeature($event, feature.id)"
                    (dragend)="onDragEndFeature($event)"
                    class="feature-card flex flex-col items-center gap-2 p-4 rounded border border-[#CED4DA] shadow-sm transition-all hover:shadow-md hover:border-[#049AD0] bg-white cursor-grab active:cursor-grabbing"
                  >
                    <div class="relative w-full">
                      <div
                        [innerHTML]="getSafeHtml(feature.icon)"
                        class="w-8 h-8 mx-auto"
                      ></div>
                      <button
                        class="absolute -top-2 -right-2 p-1"
                        (click)="$event.stopPropagation()"
                      >
                        <svg
                          class="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                            stroke="#686868"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                            stroke="#686868"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                            stroke="#686868"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <span
                      class="text-sm md:text-base font-normal text-center text-[#686868]"
                    >
                      {{ feature.label }}
                    </span>
                  </div>
                </div>

                <!-- Selected Section -->
                <div class="mb-8">
                  <h3 class="text-base font-medium text-[#686868] mb-3">
                    Selected
                  </h3>

                  <!-- Selected Features Container -->
                  <div
                    class="relative w-full rounded border-2 border-dashed transition-colors p-8"
                    [ngClass]="{
                      'border-[#CED4DA] bg-white': !isDragOverSelected,
                      'border-[#049AD0] bg-[#E8F4F8]': isDragOverSelected,
                    }"
                    style="min-height: 150px;"
                    (dragover)="onDragOverSelected($event)"
                    (drop)="onDropSelected($event)"
                    (dragleave)="onDragLeaveSelected($event)"
                  >
                    <!-- Selected Feature Cards -->
                    <div class="flex flex-wrap gap-6 w-full">
                      <div
                        *ngFor="let featureId of activeFeatures"
                        draggable="true"
                        (dragstart)="onDragStart($event, featureId)"
                        (dragend)="onDragEnd($event)"
                        class="flex flex-col items-center gap-2 p-4 w-[120px] h-[120px] rounded border border-[#049AD0] shadow-[0_4px_15px_rgba(30,30,45,0.05)] bg-white transition-all hover:shadow-md cursor-move"
                      >
                        <div
                          class="relative w-full flex-1 flex items-center justify-center"
                        >
                          <div
                            [innerHTML]="getFeatureIcon(featureId)"
                            class="w-8 h-8"
                          ></div>
                          <button
                            class="absolute -top-2 -right-2 p-1"
                            (click)="toggleFeature(featureId)"
                            title="Remove feature"
                          >
                            <svg
                              class="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                stroke="#049AD0"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                stroke="#049AD0"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                stroke="#049AD0"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <span
                          class="text-base font-medium text-[#049AD0] text-center leading-tight"
                        >
                          {{ getFeatureLabel(featureId) }}
                        </span>
                      </div>
                    </div>

                    <!-- Drag to Add Message -->
                    <div
                      class="absolute left-1/2 bottom-[10%] -translate-x-1/2 translate-y-1/2 flex items-center gap-2"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 9L2 12L5 15"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 5L12 2L15 5"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15 19L12 22L9 19"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19 9L22 12L19 15"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 12H22"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 2V22"
                          stroke="#686868"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        class="text-[#878A99] text-lg font-semibold whitespace-nowrap"
                      >
                        Drag to add & sort features
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Footer with Back and Next buttons -->
                <div class="pt-6 mt-8 border-t border-[#CED4DA]">
                  <div class="flex justify-between items-center">
                    <button
                      (click)="onBack()"
                      class="flex items-center gap-2 px-5 py-2 bg-[#DEE1EB] hover:bg-[#CED3E0] text-[#4C546C] rounded font-semibold transition-colors"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.25 9H3.75"
                          stroke="#4C546C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 14.25L3.75 9L9 3.75"
                          stroke="#4C546C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span>Back</span>
                    </button>

                    <button
                      (click)="onNext()"
                      class="flex items-center gap-2 px-5 py-2 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors"
                    >
                      <span>Next</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 9H14.25"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 3.75L14.25 9L9 14.25"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Features Content Tab -->
              <div
                *ngIf="currentTab === 'content'"
                class="bg-white rounded shadow-md border border-[#E9E9E9]"
              >
                <!-- Selected Features Tabs - Only Show If Features Are Selected -->
                <div
                  *ngIf="activeFeatures.length > 0"
                  class="px-8 py-6 border-b border-[#CED4DA] bg-white"
                >
                  <div class="flex items-center gap-3 flex-wrap">
                    <button
                      *ngFor="let featureId of activeFeatures; let i = index"
                      [class.active-feature-tab]="i === selectedFeatureIndex"
                      (click)="selectedFeatureIndex = i"
                      class="flex items-center gap-2 px-4 py-2.5 rounded border transition-all font-medium text-sm md:text-base"
                      [ngClass]="{
                        'bg-[#009FD8] text-white border-[#009FD8] shadow-md':
                          i === selectedFeatureIndex,
                        'bg-white text-[#686868] border-[#CED4DA] hover:border-[#049AD0] hover:text-[#049AD0]':
                          i !== selectedFeatureIndex,
                      }"
                    >
                      <div
                        [innerHTML]="getFeatureTabIcon(featureId, i)"
                        class="w-5 h-5 flex items-center justify-center flex-shrink-0"
                      ></div>
                      <span class="whitespace-nowrap">
                        {{ getFeatureLabel(featureId) }}
                      </span>
                    </button>
                  </div>
                </div>

                <!-- Content Area -->
                <div class="p-8">
                  <!-- Schedule Feature Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'schedule'
                    "
                  >
                    <div class="flex flex-col gap-0">
                      <!-- Header Container with Title and Controls -->
                      <div
                        class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t-md"
                      >
                        <div
                          class="flex items-center justify-between px-6 py-4 gap-6"
                        >
                          <h2
                            class="text-xl font-medium text-[#686868] whitespace-nowrap"
                          >
                            Schedule
                          </h2>

                          <div
                            class="flex-1 flex items-center justify-end gap-3"
                          >
                            <!-- Search Bar -->
                            <div class="relative">
                              <input
                                type="text"
                                placeholder="Search"
                                class="h-11 pl-5 pr-11 border border-[#DADADA] rounded text-base font-medium placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] bg-[#FBFBFB] transition-colors"
                                style="width: 220px;"
                              />
                              <svg
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B1B1B1] pointer-events-none"
                                fill="none"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0C13.9705 0 17.9998 4.02959 18 9C18 13.9706 13.9706 18 9 18C4.02959 17.9998 0 13.9705 0 9C0.000175931 4.0297 4.0297 0.000175935 9 0ZM9 1.5C4.85812 1.50018 1.50018 4.85812 1.5 9C1.5 13.142 4.85801 16.4998 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.4998 4.85801 13.142 1.5 9 1.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>

                            <!-- Upload Schedule Button -->
                            <button
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-[#049AD0] bg-white hover:bg-gray-50 transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.4424 9.58572C10.2135 9.35684 9.84256 9.35684 9.61368 9.58572L7.1033 12.0961C6.87442 12.325 6.87442 12.6959 7.1033 12.9248C7.33203 13.1535 7.70313 13.1535 7.93185 12.9248L9.44202 11.4146V15.6485C9.44202 15.972 9.70447 16.2344 10.028 16.2344C10.3516 16.2344 10.6139 15.972 10.6139 15.6485V11.4146L12.1241 12.9247C12.3531 13.1537 12.7239 13.1535 12.9528 12.9247C13.1816 12.6959 13.1816 12.325 12.9528 12.0961L10.4424 9.58572Z"
                                  fill="#049AD0"
                                />
                                <path
                                  d="M12.5385 6.90369H7.51758C7.19409 6.90369 6.93164 7.16599 6.93164 7.48962C6.93164 7.81311 7.19409 8.07556 7.51758 8.07556H12.5385C12.862 8.07556 13.1244 7.81311 13.1244 7.48962C13.1244 7.16599 12.8621 6.90369 12.5385 6.90369Z"
                                  fill="#049AD0"
                                />
                                <path
                                  d="M15.677 0H6.89056C6.73523 0 6.58615 0.0617981 6.47629 0.171661L2.71072 3.93723C2.60086 4.04709 2.53906 4.19617 2.53906 4.3515V18.1589C2.53906 19.174 3.36502 20 4.38019 20H15.677C16.6893 20 17.5182 19.1815 17.5182 18.1589V1.84113C17.5182 0.828857 16.6998 0 15.677 0ZM6.93222 1.37283V3.72391C6.93222 4.09302 6.63208 4.39316 6.26297 4.39316H3.9119L6.93222 1.37283ZM16.3463 18.1589C16.3463 18.5234 16.0516 18.8281 15.677 18.8281H4.38019C4.01123 18.8281 3.71094 18.5278 3.71094 18.1589V5.56519H6.26297C7.27814 5.56519 8.1041 4.73923 8.1041 3.72406V1.17188H15.677C16.0417 1.17188 16.3463 1.46667 16.3463 1.84113V18.1589Z"
                                  fill="#049AD0"
                                />
                              </svg>
                              <span>Upload Schedule</span>
                            </button>

                            <!-- Add Schedule Button -->
                            <button
                              (click)="openScheduleModal()"
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-white bg-[#009FD8] hover:bg-[#0385b5] transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5 12H19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <span>Add Schedule</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Table -->
                      <div
                        class="border border-[#CED4DA] border-t-0 rounded-b-md overflow-hidden"
                      >
                        <!-- Table Header Row -->
                        <div
                          class="bg-white border-b border-[#CED4DA] grid grid-cols-[70px_1fr_130px_130px_130px_130px_100px] px-6 py-4 gap-4"
                        >
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sr. No
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Title
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Date
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Start Time
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            End Time
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sponsor
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Action
                          </div>
                        </div>

                        <!-- Table Body -->
                        <div
                          *ngIf="schedules.length === 0"
                          class="bg-white min-h-80 flex items-center justify-center"
                        >
                          <div class="text-center py-16">
                            <svg
                              width="64"
                              height="64"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="mx-auto mb-4 opacity-20"
                            >
                              <path
                                d="M28 4H4C2.89543 4 2 4.89543 2 6V26C2 27.1046 2.89543 28 4 28H28C29.1046 28 30 27.1046 30 26V6C30 4.89543 29.1046 4 28 4ZM28 10H4V6H28V10ZM4 26V14H28V26H4Z"
                                fill="#CED4DA"
                              />
                            </svg>
                            <p
                              class="text-[#686868] font-medium text-base mt-2"
                            >
                              No schedules added yet
                            </p>
                            <p class="text-[#878A99] text-sm mt-2">
                              Click "Add Schedule" to create your first schedule
                            </p>
                          </div>
                        </div>

                        <!-- Schedule Rows -->
                        <div *ngIf="schedules.length > 0" class="bg-white">
                          <div
                            *ngFor="let schedule of schedules; let i = index"
                            class="border-b border-[#E9E9E9] grid grid-cols-[70px_1fr_130px_130px_130px_130px_100px] px-6 py-5 gap-4 hover:bg-gray-50 transition-colors"
                          >
                            <!-- Sr. No -->
                            <div
                              class="flex items-center justify-center text-base font-semibold text-[#353846]"
                            >
                              {{ i + 1 }}
                            </div>

                            <!-- Title -->
                            <div class="flex items-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ schedule.title }}</span
                              >
                            </div>

                            <!-- Date -->
                            <div class="flex items-center justify-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ formatDate(schedule.date) }}</span
                              >
                            </div>

                            <!-- Start Time -->
                            <div class="flex items-center justify-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ formatTime(schedule.startTime) }}</span
                              >
                            </div>

                            <!-- End Time -->
                            <div class="flex items-center justify-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ formatTime(schedule.endTime) }}</span
                              >
                            </div>

                            <!-- Sponsor -->
                            <div class="flex items-center justify-center gap-3">
                              <div
                                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                              >
                                {{ getInitials(schedule.speakerName || "") }}
                              </div>
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ schedule.speakerName }}</span
                              >
                            </div>

                            <!-- Action -->
                            <div class="flex items-center justify-center gap-2">
                              <button
                                (click)="editSchedule(schedule)"
                                class="w-10 h-10 bg-[#009FD8] hover:bg-[#0385b5] rounded-full flex items-center justify-center transition-colors"
                                title="Edit"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18.1484 0.640342L18.1255 0.619484C17.6882 0.220019 17.1213 0 16.5293 0C15.8656 0 15.2283 0.28096 14.7809 0.770774L6.32044 10.0332C6.24333 10.1177 6.18484 10.2173 6.14868 10.3257L5.15385 13.308C5.03883 13.6528 5.09656 14.0342 5.30825 14.328C5.52162 14.6242 5.86537 14.801 6.22786 14.801C6.38465 14.801 6.53796 14.7688 6.68331 14.7052L9.56371 13.4451C9.66844 13.3993 9.76238 13.332 9.83944 13.2476L18.2999 3.98518C19.1803 3.02139 19.1124 1.52102 18.1484 0.640342ZM7.0599 12.7571L7.64366 11.0071L7.69289 10.9532L8.79931 11.9637L8.75007 12.0177L7.0599 12.7571ZM17.0936 2.88328L9.9012 10.7575L8.79479 9.74695L15.9872 1.87267C16.1279 1.71865 16.3204 1.6338 16.5293 1.6338C16.7126 1.6338 16.8881 1.70199 17.0239 1.82605L17.0468 1.84691C17.3454 2.1197 17.3664 2.58462 17.0936 2.88328Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.5065 7.53638C16.0553 7.53638 15.6896 7.90213 15.6896 8.35328V15.2886C15.6896 16.4341 14.7576 17.3661 13.6121 17.3661H3.7113C2.56573 17.3661 1.6338 16.4341 1.6338 15.2886V5.46825C1.6338 4.32274 2.56578 3.39076 3.7113 3.39076H10.8775C11.3287 3.39076 11.6944 3.02501 11.6944 2.57386C11.6944 2.12271 11.3287 1.75696 10.8775 1.75696H3.7113C1.66485 1.75696 0 3.42186 0 5.46825V15.2886C0 17.335 1.6649 18.9999 3.7113 18.9999H13.612C15.6584 18.9999 17.3233 17.335 17.3233 15.2886V8.35328C17.3234 7.90213 16.9576 7.53638 16.5065 7.53638Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <button
                                (click)="deleteSchedule(schedule.id)"
                                class="w-10 h-10 bg-[#BF0505] hover:bg-[#9b0404] rounded-full flex items-center justify-center transition-colors"
                                title="Delete"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.834 5.83337C15.613 5.83337 15.401 5.92117 15.2447 6.07745C15.0884 6.23373 15.0006 6.44569 15.0006 6.66671V15.9925C14.9767 16.4139 14.7873 16.8088 14.4736 17.0912C14.1598 17.3736 13.7472 17.5205 13.3256 17.5H6.67565C6.25406 17.5205 5.84147 17.3736 5.52774 17.0912C5.21401 16.8088 5.02456 16.4139 5.00065 15.9925V6.66671C5.00065 6.44569 4.91285 6.23373 4.75657 6.07745C4.60029 5.92117 4.38833 5.83337 4.16732 5.83337C3.9463 5.83337 3.73434 5.92117 3.57806 6.07745C3.42178 6.23373 3.33398 6.44569 3.33398 6.66671V15.9925C3.35777 16.8561 3.7228 17.675 4.34913 18.2699C4.97547 18.8648 5.81204 19.1873 6.67565 19.1667H13.3256C14.1893 19.1873 15.0258 18.8648 15.6522 18.2699C16.2785 17.675 16.6435 16.8561 16.6673 15.9925V6.66671C16.6673 6.44569 16.5795 6.23373 16.4232 6.07745C16.267 5.92117 16.055 5.83337 15.834 5.83337Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.6667 3.33337H13.3333V1.66671C13.3333 1.44569 13.2455 1.23373 13.0893 1.07745C12.933 0.921171 12.721 0.833374 12.5 0.833374H7.5C7.27899 0.833374 7.06702 0.921171 6.91074 1.07745C6.75446 1.23373 6.66667 1.44569 6.66667 1.66671V3.33337H3.33333C3.11232 3.33337 2.90036 3.42117 2.74408 3.57745C2.5878 3.73373 2.5 3.94569 2.5 4.16671C2.5 4.38772 2.5878 4.59968 2.74408 4.75596C2.90036 4.91224 3.11232 5.00004 3.33333 5.00004H16.6667C16.8877 5.00004 17.0996 4.91224 17.2559 4.75596C17.4122 4.59968 17.5 4.38772 17.5 4.16671C17.5 3.94569 17.4122 3.73373 17.2559 3.57745C17.0996 3.42117 16.8877 3.33337 16.6667 3.33337ZM8.33333 3.33337V2.50004H11.6667V3.33337H8.33333Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M12.5007 14.1667V8.33333C12.5007 8.11232 12.4129 7.90036 12.2566 7.74408C12.1003 7.5878 11.8883 7.5 11.6673 7.5C11.4463 7.5 11.2343 7.5878 11.0781 7.74408C10.9218 7.90036 10.834 8.11232 10.834 8.33333V14.1667C10.834 14.3877 10.9218 14.5996 11.0781 14.7559C11.2343 14.9122 11.4463 15 11.6673 15C11.8883 15 12.1003 14.9122 12.2566 14.7559C12.4129 14.5996 12.5007 14.3877 12.5007 14.1667Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Exhibitor Feature Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'exhibitor'
                    "
                  >
                    <div class="flex flex-col gap-0">
                      <!-- Header Container with Title and Controls -->
                      <div
                        class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t-md"
                      >
                        <div
                          class="flex items-center justify-between px-6 py-4 gap-6"
                        >
                          <h2
                            class="text-xl font-medium text-[#686868] whitespace-nowrap"
                          >
                            Exhibitors
                          </h2>

                          <div
                            class="flex-1 flex items-center justify-end gap-3"
                          >
                            <!-- Search Bar -->
                            <div class="relative">
                              <input
                                type="text"
                                [(ngModel)]="searchQuery"
                                placeholder="Search"
                                class="h-11 pl-5 pr-11 border border-[#DADADA] rounded text-base font-medium placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] bg-[#FBFBFB] transition-colors"
                                style="width: 220px;"
                              />
                              <svg
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B1B1B1] pointer-events-none"
                                fill="none"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0C13.9705 0 17.9998 4.02959 18 9C18 13.9706 13.9706 18 9 18C4.02959 17.9998 0 13.9705 0 9C0.000175931 4.0297 4.0297 0.000175935 9 0ZM9 1.5C4.85812 1.50018 1.50018 4.85812 1.5 9C1.5 13.142 4.85801 16.4998 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.4998 4.85801 13.142 1.5 9 1.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>

                            <!-- Upload Exhibitor Button -->
                            <button
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-[#049AD0] bg-white hover:bg-gray-50 transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.4424 9.58572C10.2135 9.35684 9.84256 9.35684 9.61368 9.58572L7.1033 12.0961C6.87442 12.325 6.87442 12.6959 7.1033 12.9248C7.33203 13.1535 7.70313 13.1535 7.93185 12.9248L9.44202 11.4146V15.6485C9.44202 15.972 9.70447 16.2344 10.028 16.2344C10.3516 16.2344 10.6139 15.972 10.6139 15.6485V11.4146L12.1241 12.9247C12.3531 13.1537 12.7239 13.1535 12.9528 12.9247C13.1816 12.6959 13.1816 12.325 12.9528 12.0961L10.4424 9.58572Z"
                                  fill="#049AD0"
                                />
                                <path
                                  d="M12.5385 6.90369H7.51758C7.19409 6.90369 6.93164 7.16599 6.93164 7.48962C6.93164 7.81311 7.19409 8.07556 7.51758 8.07556H12.5385C12.862 8.07556 13.1244 7.81311 13.1244 7.48962C13.1244 7.16599 12.8621 6.90369 12.5385 6.90369Z"
                                  fill="#049AD0"
                                />
                                <path
                                  d="M15.677 0H6.89056C6.73523 0 6.58615 0.0617981 6.47629 0.171661L2.71072 3.93723C2.60086 4.04709 2.53906 4.19617 2.53906 4.3515V18.1589C2.53906 19.174 3.36502 20 4.38019 20H15.677C16.6893 20 17.5182 19.1815 17.5182 18.1589V1.84113C17.5182 0.828857 16.6998 0 15.677 0ZM6.93222 1.37283V3.72391C6.93222 4.09302 6.63208 4.39316 6.26297 4.39316H3.9119L6.93222 1.37283ZM16.3463 18.1589C16.3463 18.5234 16.0516 18.8281 15.677 18.8281H4.38019C4.01123 18.8281 3.71094 18.5278 3.71094 18.1589V5.56519H6.26297C7.27814 5.56519 8.1041 4.73923 8.1041 3.72406V1.17188H15.677C16.0417 1.17188 16.3463 1.46667 16.3463 1.84113V18.1589Z"
                                  fill="#049AD0"
                                />
                              </svg>
                              <span>Upload Exhibitor</span>
                            </button>

                            <!-- Add Exhibitor Button -->
                            <button
                              (click)="openExhibitorModal()"
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-white bg-[#009FD8] hover:bg-[#0385b5] transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5 12H19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <span>Add Exhibitor</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Table -->
                      <div
                        class="border border-[#CED4DA] border-t-0 rounded-b-md overflow-hidden"
                      >
                        <!-- Table Header Row -->
                        <div
                          class="bg-white border-b border-[#CED4DA] grid grid-cols-[70px_1fr_130px_130px_180px_100px] px-6 py-4 gap-4"
                        >
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sr. No
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Company Name
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Hall No.
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Stall No.
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Reg. Code
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Action
                          </div>
                        </div>

                        <!-- Table Body -->
                        <div
                          *ngIf="getFilteredExhibitors().length === 0"
                          class="bg-white min-h-80 flex items-center justify-center"
                        >
                          <div class="text-center py-16">
                            <svg
                              width="64"
                              height="64"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="mx-auto mb-4 opacity-20"
                            >
                              <path
                                d="M28 4H4C2.89543 4 2 4.89543 2 6V26C2 27.1046 2.89543 28 4 28H28C29.1046 28 30 27.1046 30 26V6C30 4.89543 29.1046 4 28 4ZM28 10H4V6H28V10ZM4 26V14H28V26H4Z"
                                fill="#CED4DA"
                              />
                            </svg>
                            <p
                              class="text-[#686868] font-medium text-base mt-2"
                            >
                              No exhibitors added yet
                            </p>
                            <p class="text-[#878A99] text-sm mt-2">
                              Click "Add Exhibitor" to add your first exhibitor
                            </p>
                          </div>
                        </div>

                        <!-- Exhibitor Rows -->
                        <div
                          *ngIf="getFilteredExhibitors().length > 0"
                          class="bg-white"
                        >
                          <div
                            *ngFor="
                              let exhibitor of getFilteredExhibitors();
                              let i = index
                            "
                            class="border-b border-[#E9E9E9] grid grid-cols-[70px_1fr_130px_130px_180px_100px] px-6 py-5 gap-4 hover:bg-gray-50 transition-colors"
                          >
                            <!-- Sr. No -->
                            <div
                              class="flex items-center justify-center text-base font-semibold text-[#353846]"
                            >
                              {{ i + 1 }}
                            </div>

                            <!-- Company Name -->
                            <div class="flex items-center gap-3">
                              <div
                                *ngIf="exhibitor.companyLogo"
                                class="w-10 h-10 flex-shrink-0 rounded bg-[#F5F5F5] flex items-center justify-center overflow-hidden border border-[#E9E9E9]"
                              >
                                <img
                                  [src]="exhibitor.companyLogo"
                                  [alt]="exhibitor.companyName"
                                  class="w-full h-full object-cover"
                                />
                              </div>
                              <div
                                *ngIf="!exhibitor.companyLogo"
                                class="w-10 h-10 flex-shrink-0 rounded bg-[#F5F5F5] flex items-center justify-center text-[#B1B1B1] font-semibold text-xs border border-[#E9E9E9]"
                              >
                                {{
                                  exhibitor.companyName
                                    .substring(0, 2)
                                    .toUpperCase()
                                }}
                              </div>
                              <span
                                class="text-base font-semibold text-[#353846] truncate"
                              >
                                {{ exhibitor.companyName }}
                              </span>
                            </div>

                            <!-- Hall No -->
                            <div class="flex items-center justify-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ exhibitor.hallNo }}</span
                              >
                            </div>

                            <!-- Stall No -->
                            <div class="flex items-center justify-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ exhibitor.stallNo }}</span
                              >
                            </div>

                            <!-- Registration Code -->
                            <div class="flex items-center justify-center">
                              <span
                                class="text-base font-semibold text-[#353846]"
                                >{{ exhibitor.registrationCode }}</span
                              >
                            </div>

                            <!-- Action -->
                            <div class="flex items-center justify-center gap-2">
                              <button
                                (click)="editExhibitor(exhibitor)"
                                class="w-10 h-10 bg-[#009FD8] hover:bg-[#0385b5] rounded-full flex items-center justify-center transition-colors"
                                title="Edit"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18.1484 0.640342L18.1255 0.619484C17.6882 0.220019 17.1213 0 16.5293 0C15.8656 0 15.2283 0.28096 14.7809 0.770774L6.32044 10.0332C6.24333 10.1177 6.18484 10.2173 6.14868 10.3257L5.15385 13.308C5.03883 13.6528 5.09656 14.0342 5.30825 14.328C5.52162 14.6242 5.86537 14.801 6.22786 14.801C6.38465 14.801 6.53796 14.7688 6.68331 14.7052L9.56371 13.4451C9.66844 13.3993 9.76238 13.332 9.83944 13.2476L18.2999 3.98518C19.1803 3.02139 19.1124 1.52102 18.1484 0.640342ZM7.0599 12.7571L7.64366 11.0071L7.69289 10.9532L8.79931 11.9637L8.75007 12.0177L7.0599 12.7571ZM17.0936 2.88328L9.9012 10.7575L8.79479 9.74695L15.9872 1.87267C16.1279 1.71865 16.3204 1.6338 16.5293 1.6338C16.7126 1.6338 16.8881 1.70199 17.0239 1.82605L17.0468 1.84691C17.3454 2.1197 17.3664 2.58462 17.0936 2.88328Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.5065 7.53638C16.0553 7.53638 15.6896 7.90213 15.6896 8.35328V15.2886C15.6896 16.4341 14.7576 17.3661 13.6121 17.3661H3.7113C2.56573 17.3661 1.6338 16.4341 1.6338 15.2886V5.46825C1.6338 4.32274 2.56578 3.39076 3.7113 3.39076H10.8775C11.3287 3.39076 11.6944 3.02501 11.6944 2.57386C11.6944 2.12271 11.3287 1.75696 10.8775 1.75696H3.7113C1.66485 1.75696 0 3.42186 0 5.46825V15.2886C0 17.335 1.6649 18.9999 3.7113 18.9999H13.612C15.6584 18.9999 17.3233 17.335 17.3233 15.2886V8.35328C17.3234 7.90213 16.9576 7.53638 16.5065 7.53638Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <button
                                (click)="deleteExhibitor(exhibitor.id)"
                                class="w-10 h-10 bg-[#BF0505] hover:bg-[#9b0404] rounded-full flex items-center justify-center transition-colors"
                                title="Delete"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.834 5.83337C15.613 5.83337 15.401 5.92117 15.2447 6.07745C15.0884 6.23373 15.0006 6.44569 15.0006 6.66671V15.9925C14.9767 16.4139 14.7873 16.8088 14.4736 17.0912C14.1598 17.3736 13.7472 17.5205 13.3256 17.5H6.67565C6.25406 17.5205 5.84147 17.3736 5.52774 17.0912C5.21401 16.8088 5.02456 16.4139 5.00065 15.9925V6.66671C5.00065 6.44569 4.91285 6.23373 4.75657 6.07745C4.60029 5.92117 4.38833 5.83337 4.16732 5.83337C3.9463 5.83337 3.73434 5.92117 3.57806 6.07745C3.42178 6.23373 3.33398 6.44569 3.33398 6.66671V15.9925C3.35777 16.8561 3.7228 17.675 4.34913 18.2699C4.97547 18.8648 5.81204 19.1873 6.67565 19.1667H13.3256C14.1893 19.1873 15.0258 18.8648 15.6522 18.2699C16.2785 17.675 16.6435 16.8561 16.6673 15.9925V6.66671C16.6673 6.44569 16.5795 6.23373 16.4232 6.07745C16.267 5.92117 16.055 5.83337 15.834 5.83337Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.6667 3.33337H13.3333V1.66671C13.3333 1.44569 13.2455 1.23373 13.0893 1.07745C12.933 0.921171 12.721 0.833374 12.5 0.833374H7.5C7.27899 0.833374 7.06702 0.921171 6.91074 1.07745C6.75446 1.23373 6.66667 1.44569 6.66667 1.66671V3.33337H3.33333C3.11232 3.33337 2.90036 3.42117 2.74408 3.57745C2.5878 3.73373 2.5 3.94569 2.5 4.16671C2.5 4.38772 2.5878 4.59968 2.74408 4.75596C2.90036 4.91224 3.11232 5.00004 3.33333 5.00004H16.6667C16.8877 5.00004 17.0996 4.91224 17.2559 4.75596C17.4122 4.59968 17.5 4.38772 17.5 4.16671C17.5 3.94569 17.4122 3.73373 17.2559 3.57745C17.0996 3.42117 16.8877 3.33337 16.6667 3.33337ZM8.33333 3.33337V2.50004H11.6667V3.33337H8.33333Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M12.5007 14.1667V8.33333C12.5007 8.11232 12.4129 7.90036 12.2566 7.74408C12.1003 7.5878 11.8883 7.5 11.6673 7.5C11.4463 7.5 11.2343 7.5878 11.0781 7.74408C10.9218 7.90036 10.834 8.11232 10.834 8.33333V14.1667C10.834 14.3877 10.9218 14.5996 11.0781 14.7559C11.2343 14.9122 11.4463 15 11.6673 15C11.8883 15 12.1003 14.9122 12.2566 14.7559C12.4129 14.5996 12.5007 14.3877 12.5007 14.1667Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Other Features Content (Placeholder) -->
                  <!-- About Feature Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'about'
                    "
                    class="bg-white border border-[#CED4DA] rounded-md"
                  >
                    <!-- Header -->
                    <div class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t">
                      <div
                        class="flex items-center justify-between px-6 py-4 gap-6"
                      >
                        <h2
                          class="text-xl font-medium text-[#686868] whitespace-nowrap"
                        >
                          {{ aboutTitle || "About " + eventName }}
                        </h2>
                        <button
                          (click)="editAboutContent = true"
                          class="flex items-center gap-2 px-4 h-11 bg-[#049AD0] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors whitespace-nowrap"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7432 3.76582C14.0231 4.01076 14.0485 4.43749 13.7995 4.71384L6.79025 12.4937C6.53996 12.7715 6.11021 12.7892 5.83796 12.5329L1.78194 8.7145C1.529 8.47637 1.50478 8.07957 1.7218 7.8083C1.96127 7.50897 2.40721 7.46777 2.6922 7.7241L5.83913 10.5547C6.11261 10.8007 6.53366 10.7787 6.78005 10.5056L12.8091 3.82096C13.053 3.55046 13.4691 3.52594 13.7432 3.76582Z"
                              fill="white"
                            />
                          </svg>
                          Edit Content
                        </button>
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="px-6 py-4 max-h-[400px] overflow-y-auto">
                      <p
                        class="text-sm md:text-base text-[#353846] leading-6 md:leading-7 whitespace-pre-wrap"
                      >
                        {{ aboutDescription }}
                      </p>
                    </div>
                  </div>

                  <!-- Other Features Placeholder -->
                  <!-- Information Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'information'
                    "
                  >
                    <div class="flex flex-col gap-0">
                      <!-- Header Container with Title and Controls -->
                      <div
                        class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t-md"
                      >
                        <div
                          class="flex items-center justify-between px-6 py-4 gap-6"
                        >
                          <h2
                            class="text-xl font-medium text-[#686868] whitespace-nowrap"
                          >
                            Information
                          </h2>

                          <div
                            class="flex-1 flex items-center justify-end gap-3"
                          >
                            <!-- Search Bar -->
                            <div class="relative">
                              <input
                                type="text"
                                placeholder="Search"
                                [(ngModel)]="searchQuery"
                                class="h-11 pl-5 pr-11 border border-[#DADADA] rounded text-base font-medium placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] bg-[#FBFBFB] transition-colors"
                                style="width: 220px;"
                              />
                              <svg
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B1B1B1] pointer-events-none"
                                fill="none"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0C13.9705 0 17.9998 4.02959 18 9C18 13.9706 13.9706 18 9 18C4.02959 17.9998 0 13.9705 0 9C0.000175931 4.0297 4.0297 0.000175935 9 0ZM9 1.5C4.85812 1.50018 1.50018 4.85812 1.5 9C1.5 13.142 4.85801 16.4998 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.4998 4.85801 13.142 1.5 9 1.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>

                            <!-- Add Information Button -->
                            <button
                              (click)="openInformationModal()"
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-white bg-[#009FD8] hover:bg-[#0385b5] transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5 12H19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <span>Add Information</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Table -->
                      <div
                        class="border border-[#CED4DA] border-t-0 rounded-b-md overflow-hidden"
                      >
                        <!-- Table Header Row -->
                        <div
                          class="bg-white border-b border-[#CED4DA] grid grid-cols-[70px_1fr_150px_200px_100px] px-6 py-4 gap-4"
                        >
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sr. No
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Title
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Type
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Floor Plan Type
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Action
                          </div>
                        </div>

                        <!-- Table Body -->
                        <div
                          *ngIf="information.length === 0"
                          class="bg-white min-h-80 flex items-center justify-center"
                        >
                          <div class="text-center py-12">
                            <p class="text-[#878A99] text-lg">
                              No information available. Click "Add Information"
                              to get started.
                            </p>
                          </div>
                        </div>

                        <!-- Information Rows -->
                        <div
                          *ngFor="let info of information; let i = index"
                          class="bg-white border-b border-[#E9E9E9] last:border-b-0 grid grid-cols-[70px_1fr_150px_200px_100px] px-6 py-4 gap-4 items-center hover:bg-gray-50 transition-colors"
                        >
                          <div
                            class="text-[#353846] font-semibold text-base text-center"
                          >
                            {{ i + 1 }}
                          </div>
                          <div class="text-[#353846] font-semibold text-base">
                            {{ info.title }}
                          </div>
                          <div
                            class="text-[#353846] font-semibold text-base text-center"
                          >
                            {{ info.type }}
                          </div>
                          <div class="flex items-center justify-center gap-2">
                            <!-- Mobile Icon -->
                            <svg
                              *ngIf="
                                info.floorPlanFor === 'mobile' ||
                                info.floorPlanFor === 'both'
                              "
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.0176 1.83325H10.8176C10.5136 1.83325 10.2676 2.07929 10.2676 2.38325C10.2676 2.68721 10.5136 2.93325 10.8176 2.93325H13.0176C13.3215 2.93325 13.5676 2.68721 13.5676 2.38325C13.5676 2.07929 13.3215 1.83325 13.0176 1.83325Z"
                                fill="black"
                              />
                              <path
                                d="M15.4004 0H6.60039C5.38747 0 4.40039 0.987078 4.40039 2.2V19.8C4.40039 21.0129 5.38747 22 6.60039 22H15.4004C16.6133 22 17.6004 21.0129 17.6004 19.8V2.2C17.6004 0.987078 16.6133 0 15.4004 0ZM16.5004 19.8C16.5004 20.4076 16.008 20.9 15.4004 20.9H6.60039C5.99281 20.9 5.50039 20.4076 5.50039 19.8V2.2C5.50039 1.59242 5.99281 1.1 6.60039 1.1H15.4004C16.008 1.1 16.5004 1.59242 16.5004 2.2V19.8Z"
                                fill="black"
                              />
                              <path
                                d="M11.0004 20.1666C11.6079 20.1666 12.1004 19.6741 12.1004 19.0666C12.1004 18.459 11.6079 17.9666 11.0004 17.9666C10.3929 17.9666 9.90039 18.459 9.90039 19.0666C9.90039 19.6741 10.3929 20.1666 11.0004 20.1666Z"
                                fill="black"
                              />
                              <path
                                d="M8.98359 2.93325C9.28735 2.93325 9.53359 2.68701 9.53359 2.38325C9.53359 2.0795 9.28735 1.83325 8.98359 1.83325C8.67984 1.83325 8.43359 2.0795 8.43359 2.38325C8.43359 2.68701 8.67984 2.93325 8.98359 2.93325Z"
                                fill="black"
                              />
                            </svg>
                            <!-- Desktop Icon -->
                            <svg
                              *ngIf="
                                info.floorPlanFor === 'desktop' ||
                                info.floorPlanFor === 'both'
                              "
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.5417 15.5834H20.1667V5.5001C20.1667 4.489 19.3444 3.66675 18.3333 3.66675H3.66665C2.65555 3.66675 1.8333 4.48896 1.8333 5.5001V15.5834H0.458305C0.205004 15.5834 0 15.7884 0 16.0417V16.5001C0 17.5112 0.822207 18.3334 1.83335 18.3334H20.1667C21.1778 18.3334 22 17.5112 22 16.5001V16.0417C22 15.7884 21.795 15.5834 21.5417 15.5834ZM2.75 5.5001C2.75 4.99478 3.16134 4.58344 3.66665 4.58344H18.3333C18.8386 4.58344 19.25 4.99478 19.25 5.5001V15.5834H13.2917H8.70835H2.75V5.5001ZM20.1667 17.4167H1.83335C1.32804 17.4167 0.916695 17.0054 0.916695 16.5001H2.2917H8.51855L8.84263 16.8242C8.92856 16.9101 9.04492 16.9584 9.1667 16.9584H12.8333C12.9551 16.9584 13.0715 16.9101 13.1574 16.8242L13.4814 16.5001H19.7083H21.0833C21.0833 17.0054 20.672 17.4167 20.1667 17.4167Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <div class="flex gap-3 justify-center">
                            <button
                              (click)="editInformation(info)"
                              class="w-10 h-10 rounded-full bg-[#009FD8] flex items-center justify-center hover:bg-[#0385b5] transition-colors"
                              title="Edit"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.1484 1.64032L19.1255 1.61947C18.6882 1.21999 18.1213 1 17.5293 1C16.8656 1 16.2283 1.28101 15.7809 1.77084L7.3204 11.0332C7.24331 11.1177 7.18477 11.2173 7.14874 11.3257L6.15387 14.308C6.03877 14.6528 6.09659 15.0342 6.30823 15.328C6.52161 15.6242 6.86542 15.801 7.22789 15.801C7.38472 15.801 7.53804 15.7688 7.68334 15.7052L10.5637 14.4451C10.6684 14.3993 10.7624 14.332 10.8394 14.2476L19.2999 4.98524C20.1803 4.02143 20.1124 2.521 19.1484 1.64032ZM8.05986 13.7571L8.64367 12.0071L8.6929 11.9532L9.79926 12.9637L9.75004 13.0177L8.05986 13.7571ZM18.0936 3.88334L10.9012 11.7575L9.79482 10.7469L16.9872 2.87274C17.1279 2.71867 17.3204 2.63378 17.5293 2.63378C17.7126 2.63378 17.8881 2.70197 18.0239 2.82604L18.0468 2.84689C18.3454 3.11968 18.3664 3.58463 18.0936 3.88334Z"
                                  fill="white"
                                />
                                <path
                                  d="M17.5065 8.53653C17.0553 8.53653 16.6896 8.90229 16.6896 9.3534V16.2887C16.6896 17.4343 15.7576 18.3662 14.6121 18.3662H4.71125C3.56569 18.3662 2.63378 17.4343 2.63378 16.2887V6.46844C2.63378 5.32288 3.56584 4.39097 4.71125 4.39097H11.8775C12.3287 4.39097 12.6944 4.02506 12.6944 3.57397C12.6944 3.12288 12.3287 2.75708 11.8775 2.75708H4.71125C2.66483 2.75708 1 4.42198 1 6.46844V16.2887C1 18.3351 2.66483 20 4.71125 20H14.612C16.6584 20 18.3233 18.3351 18.3233 16.2887V9.3534C18.3234 8.90229 17.9576 8.53653 17.5065 8.53653Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <button
                              (click)="deleteInformation(info.id)"
                              class="w-10 h-10 rounded-full bg-[#BF0505] flex items-center justify-center hover:bg-[#a00404] transition-colors"
                              title="Delete"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.834 5.83325C15.613 5.83325 15.401 5.92105 15.2447 6.07733C15.0884 6.23361 15.0007 6.44557 15.0007 6.66659V15.9924C14.9767 16.4138 14.7873 16.8087 14.4736 17.0911C14.1598 17.3734 13.7472 17.5204 13.3257 17.4999H6.67565C6.25406 17.5204 5.84147 17.3734 5.52774 17.0911C5.21401 16.8087 5.02456 16.4138 5.00065 15.9924V6.66659C5.00065 6.44557 4.91285 6.23361 4.75657 6.07733C4.60029 5.92105 4.38833 5.83325 4.16732 5.83325C3.9463 5.83325 3.73434 5.92105 3.57806 6.07733C3.42178 6.23361 3.33398 6.44557 3.33398 6.66659V15.9924C3.35777 16.8559 3.7228 17.6748 4.34913 18.2698C4.97547 18.8647 5.81204 19.1872 6.67565 19.1666H13.3257C14.1893 19.1872 15.0258 18.8647 15.6522 18.2698C16.2785 17.6748 16.6435 16.8559 16.6673 15.9924V6.66659C16.6673 6.44557 16.5795 6.23361 16.4232 6.07733C16.267 5.92105 16.055 5.83325 15.834 5.83325Z"
                                  fill="white"
                                />
                                <path
                                  d="M16.6667 3.33325H13.3333V1.66659C13.3333 1.44557 13.2455 1.23361 13.0893 1.07733C12.933 0.921049 12.721 0.833252 12.5 0.833252H7.5C7.27899 0.833252 7.06702 0.921049 6.91074 1.07733C6.75446 1.23361 6.66667 1.44557 6.66667 1.66659V3.33325H3.33333C3.11232 3.33325 2.90036 3.42105 2.74408 3.57733C2.5878 3.73361 2.5 3.94557 2.5 4.16659C2.5 4.3876 2.5878 4.59956 2.74408 4.75584C2.90036 4.91212 3.11232 4.99992 3.33333 4.99992H16.6667C16.8877 4.99992 17.0996 4.91212 17.2559 4.75584C17.4122 4.59956 17.5 4.3876 17.5 4.16659C17.5 3.94557 17.4122 3.73361 17.2559 3.57733C17.0996 3.42105 16.8877 3.33325 16.6667 3.33325ZM8.33333 3.33325V2.49992H11.6667V3.33325H8.33333Z"
                                  fill="white"
                                />
                                <path
                                  d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                                  fill="white"
                                />
                                <path
                                  d="M12.5007 14.1667V8.33333C12.5007 8.11232 12.4129 7.90036 12.2566 7.74408C12.1003 7.5878 11.8883 7.5 11.6673 7.5C11.4463 7.5 11.2343 7.5878 11.0781 7.74408C10.9218 7.90036 10.834 8.11232 10.834 8.33333V14.1667C10.834 14.3877 10.9218 14.5996 11.0781 14.7559C11.2343 14.9122 11.4463 15 11.6673 15C11.8883 15 12.1003 14.9122 12.2566 14.7559C12.4129 14.5996 12.5007 14.3877 12.5007 14.1667Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Speakers Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'speakers'
                    "
                    class="w-full"
                  >
                    <!-- Speakers Table Container -->
                    <div class="border border-[#CED4DA] rounded bg-white">
                      <!-- Header -->
                      <div
                        class="px-6 py-4 border-b border-[#CED4DA] bg-[#F5F5F5] rounded-t flex items-center justify-between gap-6"
                      >
                        <h2
                          class="text-xl font-medium text-[#686868] whitespace-nowrap"
                        >
                          Speakers
                        </h2>

                        <div class="flex-1 flex items-center justify-end gap-3">
                          <!-- Search Bar -->
                          <div class="relative w-full sm:w-[328px]">
                            <input
                              type="text"
                              placeholder="Search"
                              class="w-full h-11 px-5 pr-12 border border-[#DADADA] rounded bg-[#FBFBFB] text-base text-[#212529] placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] transition-colors"
                            />
                            <svg
                              class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.4"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19.2197 19.2197C18.9268 19.5126 18.4519 19.5126 18.159 19.2197L15.428 16.4886C15.1351 16.1958 15.1351 15.7209 15.428 15.428C15.7209 15.1351 16.1958 15.1351 16.4886 15.428L19.2197 18.159C19.5126 18.4519 19.5126 18.9268 19.2197 19.2197Z"
                                fill="#B1B1B1"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5ZM0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z"
                                fill="#B1B1B1"
                              />
                            </svg>
                          </div>

                          <!-- Add Speakers Button -->
                          <button
                            (click)="openAddSpeakersModal()"
                            class="h-11 px-4 bg-[#049AD0] hover:bg-[#0385b5] rounded border border-[#049AD0] text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 5V19"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M5 12H19"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span>Add Speakers</span>
                          </button>
                        </div>
                      </div>

                      <!-- Table Header -->
                      <div
                        class="px-7 py-5 border-b border-[#CED4DA] bg-white hidden md:grid grid-cols-[60px_1fr_200px_200px_120px] gap-4 md:gap-0"
                      >
                        <div
                          class="text-base font-semibold text-[#181C32] text-center"
                        >
                          Sr. No
                        </div>
                        <div class="text-base font-semibold text-[#181C32]">
                          Name
                        </div>
                        <div class="text-base font-semibold text-[#181C32]">
                          Company
                        </div>
                        <div class="text-base font-semibold text-[#181C32]">
                          Position
                        </div>
                        <div
                          class="text-base font-semibold text-[#181C32] text-center"
                        >
                          Action
                        </div>
                      </div>

                      <!-- Speaker Rows -->
                      <div *ngIf="speakers.length > 0">
                        <div
                          *ngFor="let speaker of speakers; let i = index"
                          class="px-7 py-5 border-b border-[#CED4DA] grid grid-cols-1 md:grid-cols-[60px_1fr_200px_200px_120px] gap-4 md:gap-0 items-center"
                        >
                          <!-- Sr. No -->
                          <div
                            class="text-base font-semibold text-[#181C32] text-center"
                          >
                            {{ i + 1 }}
                          </div>

                          <!-- Name with Avatar and Email -->
                          <div class="flex items-center gap-3">
                            <div
                              *ngIf="speaker.profileImage"
                              class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                            >
                              <img
                                [src]="speaker.profileImage"
                                alt="{{ speaker.firstName }} {{
                                  speaker.lastName
                                }}"
                                class="w-full h-full object-cover"
                              />
                            </div>
                            <div
                              *ngIf="!speaker.profileImage"
                              class="w-12 h-12 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0 font-semibold text-[#009FD8]"
                            >
                              {{
                                getInitials(
                                  speaker.firstName + " " + speaker.lastName
                                )
                              }}
                            </div>
                            <div class="flex flex-col gap-1">
                              <p class="text-base font-semibold text-[#353846]">
                                {{ speaker.firstName }} {{ speaker.lastName }}
                              </p>
                              <p class="text-sm text-[#878A99]">
                                {{ speaker.email }}
                              </p>
                            </div>
                          </div>

                          <!-- Company -->
                          <div class="text-base font-semibold text-[#353846]">
                            {{ speaker.company }}
                          </div>

                          <!-- Position -->
                          <div class="text-base font-semibold text-[#353846]">
                            {{ speaker.position }}
                          </div>

                          <!-- Action Buttons -->
                          <div class="flex items-center justify-center gap-3">
                            <!-- Edit Button -->
                            <button
                              (click)="editSpeaker(speaker)"
                              class="w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                              title="Edit speaker"
                            >
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="20" cy="20" r="20" fill="#009FD8" />
                                <path
                                  d="M29.1484 11.6403L29.1255 11.6195C28.6882 11.22 28.1213 11 27.5293 11C26.8656 11 26.2283 11.281 25.7809 11.7708L17.3204 21.0332C17.2433 21.1177 17.1848 21.2173 17.1487 21.3257L16.1539 24.308C16.0388 24.6528 16.0966 25.0342 16.3082 25.328C16.5216 25.6242 16.8654 25.801 17.2279 25.801C17.3847 25.801 17.538 25.7688 17.6833 25.7052L20.5637 24.4451C20.6684 24.3993 20.7624 24.332 20.8394 24.2476L29.2999 14.9852C30.1803 14.0214 30.1124 12.521 29.1484 11.6403ZM18.0599 23.7571L18.6437 22.0071L18.6929 21.9532L19.7993 22.9637L19.7501 23.0177L18.0599 23.7571ZM28.0936 13.8833L20.9012 21.7575L19.7948 20.7469L26.9872 12.8727C27.1279 12.7187 27.3204 12.6338 27.5293 12.6338C27.7126 12.6338 27.8881 12.702 28.0239 12.826L28.0468 12.8469C28.3454 13.1197 28.3664 13.5846 28.0936 13.8833Z"
                                  fill="white"
                                />
                                <path
                                  d="M27.5065 18.5364C27.0553 18.5364 26.6896 18.9021 26.6896 19.3533V26.2886C26.6896 27.4341 25.7576 28.3661 24.6121 28.3661H14.7113C13.5657 28.3661 12.6338 27.4341 12.6338 26.2886V16.4683C12.6338 15.3227 13.5658 14.3908 14.7113 14.3908H21.8775C22.3287 14.3908 22.6944 14.025 22.6944 13.5739C22.6944 13.1227 22.3287 12.757 21.8775 12.757H14.7113C12.6648 12.757 11 14.4219 11 16.4683V26.2886C11 28.335 12.6649 29.9999 14.7113 29.9999H24.612C26.6584 29.9999 28.3233 28.335 28.3233 26.2886V19.3533C28.3234 18.9021 27.9576 18.5364 27.5065 18.5364Z"
                                  fill="white"
                                />
                              </svg>
                            </button>

                            <!-- Delete Button -->
                            <button
                              (click)="deleteSpeaker(speaker.id)"
                              class="w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                              title="Delete speaker"
                            >
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="20" cy="20" r="20" fill="#BF0505" />
                                <g transform="translate(10, 10)">
                                  <path
                                    d="M15.834 5.83337C15.613 5.83337 15.401 5.92117 15.2447 6.07745C15.0884 6.23373 15.0007 6.44569 15.0007 6.66671V15.9925C14.9767 16.4139 14.7873 16.8088 14.4736 17.0912C14.1598 17.3736 13.7472 17.5205 13.3257 17.5H6.67565C6.25406 17.5205 5.84147 17.3736 5.52774 17.0912C5.21401 16.8088 5.02456 16.4139 5.00065 15.9925V6.66671C5.00065 6.44569 4.91285 6.23373 4.75657 6.07745C4.60029 5.92117 4.38833 5.83337 4.16732 5.83337C3.9463 5.83337 3.73434 5.92117 3.57806 6.07745C3.42178 6.23373 3.33398 6.44569 3.33398 6.66671V15.9925C3.35777 16.8561 3.7228 17.675 4.34913 18.2699C4.97547 18.8648 5.81204 19.1873 6.67565 19.1667H13.3257C14.1893 19.1873 15.0258 18.8648 15.6522 18.2699C16.2785 17.675 16.6435 16.8561 16.6673 15.9925V6.66671C16.6673 6.44569 16.5795 6.23373 16.4232 6.07745C16.267 5.92117 16.055 5.83337 15.834 5.83337Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.6667 3.33337H13.3333V1.66671C13.3333 1.44569 13.2455 1.23373 13.0893 1.07745C12.933 0.921171 12.721 0.833374 12.5 0.833374H7.5C7.27899 0.833374 7.06702 0.921171 6.91074 1.07745C6.75446 1.23373 6.66667 1.44569 6.66667 1.66671V3.33337H3.33333C3.11232 3.33337 2.90036 3.42117 2.74408 3.57745C2.5878 3.73373 2.5 3.94569 2.5 4.16671C2.5 4.38772 2.5878 4.59968 2.74408 4.75596C2.90036 4.91224 3.11232 5.00004 3.33333 5.00004H16.6667C16.8877 5.00004 17.0996 4.91224 17.2559 4.75596C17.4122 4.59968 17.5 4.38772 17.5 4.16671C17.5 3.94569 17.4122 3.73373 17.2559 3.57745C17.0996 3.42117 16.8877 3.33337 16.6667 3.33337ZM8.33333 3.33337V2.50004H11.6667V3.33337H8.33333Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M12.5007 14.1667V8.33333C12.5007 8.11232 12.4129 7.90036 12.2566 7.74408C12.1003 7.5878 11.8883 7.5 11.6673 7.5C11.4463 7.5 11.2343 7.5878 11.0781 7.74408C10.9218 7.90036 10.834 8.11232 10.834 8.33333V14.1667C10.834 14.3877 10.9218 14.5996 11.0781 14.7559C11.2343 14.9122 11.4463 15 11.6673 15C11.8883 15 12.1003 14.9122 12.2566 14.7559C12.4129 14.5996 12.5007 14.3877 12.5007 14.1667Z"
                                    fill="white"
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Empty State -->
                      <div
                        *ngIf="speakers.length === 0"
                        class="py-20 flex flex-col items-center justify-center"
                      >
                        <svg
                          class="mb-6"
                          width="80"
                          height="80"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.9361 12.6196L17.3324 2.01581C16.2362 0.919565 14.4523 0.919502 13.356 2.01581C12.3705 3.00125 12.2856 4.50418 13.0134 5.57737L12.9986 5.65118C12.2341 9.47399 10.3729 12.9517 7.61613 15.7085L2.75245 20.5722C1.65357 21.6711 1.65339 23.4496 2.75245 24.5485L5.40332 27.1994C6.50213 28.2983 8.28075 28.2983 9.37968 27.1994L10.0424 26.5366L14.6815 31.1758C15.7804 32.2747 17.5589 32.2748 18.6579 31.1758C19.7542 30.0795 19.7542 28.2957 18.6579 27.1995L16.6697 25.2113L17.3324 24.5485C18.4313 23.4497 18.4314 21.6712 17.3324 20.5722L16.882 20.1218C19.0976 18.5706 21.6138 17.4907 24.3008 16.9532L24.3756 16.9383C25.4727 17.679 26.9721 17.5599 27.9361 16.5958H27.9362C29.0323 15.4997 29.0323 13.7159 27.9361 12.6196ZM8.05425 25.874C7.688 26.2401 7.095 26.2402 6.72875 25.8739L4.07788 23.223C3.71157 22.8566 3.71157 22.2639 4.07788 21.8976L8.71694 17.2585L12.6933 21.2348C12.2394 21.6887 8.51931 25.4088 8.05425 25.874ZM17.3324 28.5248C17.6977 28.8902 17.6977 29.4848 17.3324 29.8503C16.967 30.2156 16.3723 30.2156 16.0069 29.8503L11.3678 25.2111L12.6933 23.8857L17.3324 28.5248ZM14.0187 22.5603C14.3005 22.2785 14.7222 21.847 15.3879 21.2785L16.0069 21.8976C16.3732 22.2639 16.3732 22.8566 16.0069 23.223L15.3442 23.8858L14.0187 22.5603ZM14.0586 19.9493L10.0024 15.8932C12.1761 13.3832 13.7327 10.4204 14.5655 7.20168L22.75 15.3862C19.5313 16.2189 16.5685 17.7755 14.0586 19.9493ZM26.610 15.2703C26.2435 15.6368 25.6489 15.6368 25.2824 15.2703L14.0805 4.06843C13.714 3.70193 13.714 3.10731 14.0805 2.74081C14.447 2.37431 15.0416 2.37431 15.4081 2.74081L26.610 13.9427C26.9765 14.3092 26.9765 14.9038 26.610 15.2703Z"
                            fill="#D0D0D0"
                          />
                        </svg>
                        <h3
                          class="text-xl sm:text-2xl font-semibold text-[#878A99] mb-2"
                        >
                          No Speakers Added Yet
                        </h3>
                        <p
                          class="text-sm sm:text-base text-[#686868] text-center max-w-md px-4"
                        >
                          Click "Add Speakers" button to add speakers to your
                          event
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Sponsors Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'sponsors'
                    "
                  >
                    <div class="flex flex-col gap-0">
                      <!-- Header Container with Title and Controls -->
                      <div
                        class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t-md"
                      >
                        <div
                          class="flex items-center justify-between px-6 py-4 gap-6"
                        >
                          <h2
                            class="text-xl font-medium text-[#686868] whitespace-nowrap"
                          >
                            Sponsors
                          </h2>

                          <div
                            class="flex-1 flex items-center justify-end gap-3"
                          >
                            <!-- Search Bar -->
                            <div class="relative">
                              <input
                                type="text"
                                placeholder="Search"
                                class="h-11 pl-5 pr-11 border border-[#DADADA] rounded text-base font-medium placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] bg-[#FBFBFB] transition-colors"
                                style="width: 220px;"
                              />
                              <svg
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B1B1B1] pointer-events-none"
                                fill="none"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0C13.9705 0 17.9998 4.02959 18 9C18 13.9706 13.9706 18 9 18C4.02959 17.9998 0 13.9705 0 9C0.000175931 4.0297 4.0297 0.000175935 9 0ZM9 1.5C4.85812 1.50018 1.50018 4.85812 1.5 9C1.5 13.142 4.85801 16.4998 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.4998 4.85801 13.142 1.5 9 1.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>

                            <!-- Add Sponsors Button -->
                            <button
                              (click)="openSponsorsModal()"
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-white bg-[#009FD8] hover:bg-[#0385b5] transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5 12H19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <span>Add Sponsors</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Table -->
                      <div
                        class="border border-[#CED4DA] border-t-0 rounded-b-md overflow-hidden"
                      >
                        <!-- Table Header Row -->
                        <div
                          class="bg-white border-b border-[#CED4DA] grid grid-cols-[70px_1fr_150px_150px_150px_120px_100px] px-6 py-4 gap-4"
                        >
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sr. No
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Company
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Email
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Phone
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Track
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sequence
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Action
                          </div>
                        </div>

                        <!-- Table Body -->
                        <div
                          *ngIf="sponsors.length === 0"
                          class="bg-white min-h-80 flex items-center justify-center"
                        >
                          <div class="text-center py-12">
                            <p class="text-[#878A99] text-lg">
                              No sponsors available. Click "Add Sponsors" to get
                              started.
                            </p>
                          </div>
                        </div>

                        <!-- Sponsor Rows -->
                        <div
                          *ngFor="let sponsor of sponsors; let i = index"
                          class="bg-white border-b border-[#E9E9E9] last:border-b-0 grid grid-cols-[70px_1fr_150px_150px_150px_120px_100px] px-6 py-4 gap-4 items-center hover:bg-gray-50 transition-colors"
                        >
                          <div
                            class="text-[#353846] font-semibold text-base text-center"
                          >
                            {{ i + 1 }}
                          </div>
                          <div class="flex items-center gap-3">
                            <div
                              *ngIf="sponsor.companyLogo"
                              class="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-[#F5F5F5]"
                            >
                              <img
                                [src]="sponsor.companyLogo"
                                alt="{{ sponsor.companyName }}"
                                class="w-full h-full object-cover"
                              />
                            </div>
                            <div
                              *ngIf="!sponsor.companyLogo"
                              class="w-10 h-10 rounded flex-shrink-0 bg-[#F5F5F5]"
                            ></div>
                            <span
                              class="text-[#353846] font-semibold text-base"
                            >
                              {{ sponsor.companyName }}
                            </span>
                          </div>
                          <div
                            class="text-[#353846] font-semibold text-base truncate"
                            [title]="sponsor.email"
                          >
                            {{ sponsor.email }}
                          </div>
                          <div
                            class="text-[#353846] font-semibold text-base text-center truncate"
                            [title]="sponsor.phone"
                          >
                            {{ sponsor.phone }}
                          </div>
                          <div class="text-[#353846] font-semibold text-base">
                            {{ sponsor.track }}
                          </div>
                          <div
                            class="text-[#353846] font-semibold text-base text-center"
                          >
                            {{ sponsor.sequence }}
                          </div>
                          <div class="flex gap-3 justify-center">
                            <button
                              (click)="editSponsor(sponsor)"
                              class="w-10 h-10 rounded-full bg-[#009FD8] flex items-center justify-center hover:bg-[#0385b5] transition-colors"
                              title="Edit"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19.1484 1.64032L19.1255 1.61947C18.6882 1.21999 18.1213 1 17.5293 1C16.8656 1 16.2283 1.28101 15.7809 1.77084L7.3204 11.0332C7.24331 11.1177 7.18477 11.2173 7.14874 11.3257L6.15387 14.308C6.03877 14.6528 6.09659 15.0342 6.30823 15.328C6.52161 15.6242 6.86542 15.801 7.22789 15.801C7.38472 15.801 7.53804 15.7688 7.68334 15.7052L10.5637 14.4451C10.6684 14.3993 10.7624 14.332 10.8394 14.2476L19.2999 4.98524C20.1803 4.02143 20.1124 2.521 19.1484 1.64032ZM8.05986 13.7571L8.64367 12.0071L8.6929 11.9532L9.79926 12.9637L9.75004 13.0177L8.05986 13.7571ZM18.0936 3.88334L10.9012 11.7575L9.79482 10.7469L16.9872 2.87274C17.1279 2.71867 17.3204 2.63378 17.5293 2.63378C17.7126 2.63378 17.8881 2.70197 18.0239 2.82604L18.0468 2.84689C18.3454 3.11968 18.3664 3.58463 18.0936 3.88334Z"
                                  fill="white"
                                />
                                <path
                                  d="M17.5065 8.53653C17.0553 8.53653 16.6896 8.90229 16.6896 9.3534V16.2887C16.6896 17.4343 15.7576 18.3662 14.6121 18.3662H4.71125C3.56569 18.3662 2.63378 17.4343 2.63378 16.2887V6.46844C2.63378 5.32288 3.56584 4.39097 4.71125 4.39097H11.8775C12.3287 4.39097 12.6944 4.02506 12.6944 3.57397C12.6944 3.12288 12.3287 2.75708 11.8775 2.75708H4.71125C2.66483 2.75708 1 4.42198 1 6.46844V16.2887C1 18.3351 2.66483 20 4.71125 20H14.612C16.6584 20 18.3233 18.3351 18.3233 16.2887V9.3534C18.3234 8.90229 17.9576 8.53653 17.5065 8.53653Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <button
                              (click)="deleteSponsor(sponsor.id)"
                              class="w-10 h-10 rounded-full bg-[#BF0505] flex items-center justify-center hover:bg-[#a00404] transition-colors"
                              title="Delete"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.834 5.83325C15.613 5.83325 15.401 5.92105 15.2447 6.07733C15.0884 6.23361 15.0007 6.44557 15.0007 6.66659V15.9924C14.9767 16.4138 14.7873 16.8087 14.4736 17.0911C14.1598 17.3734 13.7472 17.5204 13.3257 17.4999H6.67565C6.25406 17.5204 5.84147 17.3734 5.52774 17.0911C5.21401 16.8087 5.02456 16.4138 5.00065 15.9924V6.66659C5.00065 6.44557 4.91285 6.23361 4.75657 6.07733C4.60029 5.92105 4.38833 5.83325 4.16732 5.83325C3.9463 5.83325 3.73434 5.92105 3.57806 6.07733C3.42178 6.23361 3.33398 6.44557 3.33398 6.66659V15.9924C3.35777 16.8559 3.7228 17.6748 4.34913 18.2698C4.97547 18.8647 5.81204 19.1872 6.67565 19.1666H13.3257C14.1893 19.1872 15.0258 18.8647 15.6522 18.2698C16.2785 17.6748 16.6435 16.8559 16.6673 15.9924V6.66659C16.6673 6.44557 16.5795 6.23361 16.4232 6.07733C16.267 5.92105 16.055 5.83325 15.834 5.83325Z"
                                  fill="white"
                                />
                                <path
                                  d="M16.6667 3.33325H13.3333V1.66659C13.3333 1.44557 13.2455 1.23361 13.0893 1.07733C12.933 0.921049 12.721 0.833252 12.5 0.833252H7.5C7.27899 0.833252 7.06702 0.921049 6.91074 1.07733C6.75446 1.23361 6.66667 1.44557 6.66667 1.66659V3.33325H3.33333C3.11232 3.33325 2.90036 3.42105 2.74408 3.57733C2.5878 3.73361 2.5 3.94557 2.5 4.16659C2.5 4.3876 2.5878 4.59956 2.74408 4.75584C2.90036 4.91212 3.11232 4.99992 3.33333 4.99992H16.6667C16.8877 4.99992 17.0996 4.91212 17.2559 4.75584C17.4122 4.59956 17.5 4.3876 17.5 4.16659C17.5 3.94557 17.4122 3.73361 17.2559 3.57733C17.0996 3.42105 16.8877 3.33325 16.6667 3.33325ZM8.33333 3.33325V2.49992H11.6667V3.33325H8.33333Z"
                                  fill="white"
                                />
                                <path
                                  d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                                  fill="white"
                                />
                                <path
                                  d="M12.5007 14.1667V8.33333C12.5007 8.11232 12.4129 7.90036 12.2566 7.74408C12.1003 7.5878 11.8883 7.5 11.6673 7.5C11.4463 7.5 11.2343 7.5878 11.0781 7.74408C10.9218 7.90036 10.834 8.11232 10.834 8.33333V14.1667C10.834 14.3877 10.9218 14.5996 11.0781 14.7559C11.2343 14.9122 11.4463 15 11.6673 15C11.8883 15 12.1003 14.9122 12.2566 14.7559C12.4129 14.5996 12.5007 14.3877 12.5007 14.1667Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Social Media Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'social-media'
                    "
                  >
                    <div class="flex flex-col gap-0">
                      <!-- Header Container with Title and Controls -->
                      <div
                        class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t-md"
                      >
                        <div
                          class="flex items-center justify-between px-6 py-4 gap-6"
                        >
                          <h2
                            class="text-xl font-medium text-[#686868] whitespace-nowrap"
                          >
                            Social Media
                          </h2>

                          <div
                            class="flex-1 flex items-center justify-end gap-3"
                          >
                            <!-- Search Bar -->
                            <div class="relative">
                              <input
                                type="text"
                                placeholder="Search"
                                class="h-11 pl-5 pr-11 border border-[#DADADA] rounded text-base font-medium placeholder-[#878A99] focus:outline-none focus:border-[#049AD0] bg-[#FBFBFB] transition-colors"
                                style="width: 220px;"
                              />
                              <svg
                                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B1B1B1] pointer-events-none"
                                fill="none"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 0C13.9705 0 17.9998 4.02959 18 9C18 13.9706 13.9706 18 9 18C4.02959 17.9998 0 13.9705 0 9C0.000175931 4.0297 4.0297 0.000175935 9 0ZM9 1.5C4.85812 1.50018 1.50018 4.85812 1.5 9C1.5 13.142 4.85801 16.4998 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.4998 4.85801 13.142 1.5 9 1.5Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>

                            <!-- Add Social Media Button -->
                            <button
                              (click)="openAddSocialMediaModal()"
                              class="flex items-center gap-2 px-4 h-11 border border-[#049AD0] rounded font-semibold text-sm text-white bg-[#009FD8] hover:bg-[#0385b5] transition-colors whitespace-nowrap"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 5V19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M5 12H19"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <span>Add Social Media</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <!-- Table -->
                      <div
                        class="border border-[#CED4DA] border-t-0 rounded-b-md overflow-hidden"
                      >
                        <!-- Table Header Row -->
                        <div
                          class="bg-white border-b border-[#CED4DA] grid grid-cols-[70px_1fr_200px_120px] px-6 py-4 gap-4"
                        >
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Sr. No
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            Type
                          </div>
                          <div class="text-[#181C32] font-bold text-base">
                            URL
                          </div>
                          <div
                            class="text-[#181C32] font-bold text-base text-center"
                          >
                            Action
                          </div>
                        </div>

                        <!-- Table Rows -->
                        <div
                          *ngIf="socialMediaList.length > 0; else emptyState"
                        >
                          <div
                            *ngFor="let item of socialMediaList; let i = index"
                            class="bg-white border-b border-[#E9E9E9] grid grid-cols-[70px_1fr_200px_120px] px-6 py-4 gap-4 items-center"
                          >
                            <div
                              class="text-[#353846] font-semibold text-base text-center"
                            >
                              {{ i + 1 }}
                            </div>
                            <div
                              class="text-[#353846] font-semibold text-base truncate"
                            >
                              {{ item.type }}
                            </div>
                            <div
                              class="text-[#353846] font-semibold text-base truncate"
                            >
                              {{ item.url }}
                            </div>
                            <div class="flex items-center justify-center gap-2">
                              <button
                                (click)="editSocialMedia(item)"
                                class="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                                aria-label="Edit"
                              >
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="20"
                                    cy="20"
                                    r="20"
                                    fill="#009FD8"
                                  />
                                  <path
                                    d="M29.1464 11.6403L29.1235 11.6195C28.6862 11.22 28.1194 11 27.5273 11C26.8636 11 26.2264 11.281 25.7789 11.7708L17.3185 21.0332C17.2414 21.1177 17.1829 21.2173 17.1467 21.3257L16.1519 24.308C16.0369 24.6528 16.0946 25.0342 16.3063 25.328C16.5197 25.6242 16.8634 25.801 17.2259 25.801C17.3827 25.801 17.536 25.7688 17.6814 25.7052L20.5618 24.4451C20.6665 24.3993 20.7604 24.332 20.8375 24.2476L29.298 14.9852C30.1784 14.0214 30.1105 12.521 29.1464 11.6403ZM18.058 23.7571L18.6417 22.0071L18.6909 21.9532L19.7974 22.9637L19.7481 23.0177L18.058 23.7571ZM28.0917 13.8833L20.8992 21.7575L19.7928 20.7469L26.9853 12.8727C27.1259 12.7187 27.3185 12.6338 27.5274 12.6338C27.7106 12.6338 27.8862 12.702 28.022 12.826L28.0448 12.8469C28.3435 13.1197 28.3645 13.5846 28.0917 13.8833Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M27.5065 18.5364C27.0553 18.5364 26.6896 18.9021 26.6896 19.3533V26.2886C26.6896 27.4341 25.7576 28.3661 24.6121 28.3661H14.7113C13.5657 28.3661 12.6338 27.4341 12.6338 26.2886V16.4683C12.6338 15.3227 13.5658 14.3908 14.7113 14.3908H21.8775C22.3287 14.3908 22.6944 14.025 22.6944 13.5739C22.6944 13.1227 22.3287 12.757 21.8775 12.757H14.7113C12.6648 12.757 11 14.4219 11 16.4683V26.2886C11 28.335 12.6649 29.9999 14.7113 29.9999H24.612C26.6584 29.9999 28.3233 28.335 28.3233 26.2886V19.3533C28.3234 18.9021 27.9576 18.5364 27.5065 18.5364Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <button
                                (click)="deleteSocialMedia(item.id)"
                                class="w-10 h-10 rounded-full bg-[#BF0505] hover:bg-[#a00404] flex items-center justify-center transition-colors"
                                aria-label="Delete"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.832 5.83325C15.611 5.83325 15.3991 5.92105 15.2428 6.07733C15.0865 6.23361 14.9987 6.44557 14.9987 6.66659V15.9924C14.9748 16.4138 14.7853 16.8087 14.4716 17.0911C14.1579 17.3734 13.7453 17.5204 13.3237 17.4999H6.6737C6.25211 17.5204 5.83952 17.3734 5.52579 17.0911C5.21205 16.8087 5.0226 16.4138 4.9987 15.9924V6.66659C4.9987 6.44557 4.9109 6.23361 4.75462 6.07733C4.59834 5.92105 4.38638 5.83325 4.16536 5.83325C3.94435 5.83325 3.73239 5.92105 3.57611 6.07733C3.41983 6.23361 3.33203 6.44557 3.33203 6.66659V15.9924C3.35582 16.8559 3.72085 17.6748 4.34718 18.2698C4.97351 18.8647 5.81009 19.1872 6.6737 19.1666H13.3237C14.1873 19.1872 15.0239 18.8647 15.6502 18.2698C16.2765 17.6748 16.6416 16.8559 16.6654 15.9924V6.66659C16.6654 6.44557 16.5776 6.23361 16.4213 6.07733C16.265 5.92105 16.053 5.83325 15.832 5.83325Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M16.6667 3.33325H13.3333V1.66659C13.3333 1.44557 13.2455 1.23361 13.0893 1.07733C12.933 0.921049 12.721 0.833252 12.5 0.833252H7.5C7.27899 0.833252 7.06702 0.921049 6.91074 1.07733C6.75446 1.23361 6.66667 1.44557 6.66667 1.66659V3.33325H3.33333C3.11232 3.33325 2.90036 3.42105 2.74408 3.57733C2.5878 3.73361 2.5 3.94557 2.5 4.16659C2.5 4.3876 2.5878 4.59956 2.74408 4.75584C2.90036 4.91212 3.11232 4.99992 3.33333 4.99992H16.6667C16.8877 4.99992 17.0996 4.91212 17.2559 4.75584C17.4122 4.59956 17.5 4.3876 17.5 4.16659C17.5 3.94557 17.4122 3.73361 17.2559 3.57733C17.0996 3.42105 16.8877 3.33325 16.6667 3.33325ZM8.33333 3.33325V2.49992H11.6667V3.33325H8.33333Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M9.16667 14.1667V8.33333C9.16667 8.11232 9.07887 7.90036 8.92259 7.74408C8.76631 7.5878 8.55435 7.5 8.33333 7.5C8.11232 7.5 7.90036 7.5878 7.74408 7.74408C7.5878 7.90036 7.5 8.11232 7.5 8.33333V14.1667C7.5 14.3877 7.5878 14.5996 7.74408 14.7559C7.90036 14.9122 8.11232 15 8.33333 15C8.55435 15 8.76631 14.9122 8.92259 14.7559C9.07887 14.5996 9.16667 14.3877 9.16667 14.1667Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M12.4987 14.1667V8.33333C12.4987 8.11232 12.4109 7.90036 12.2546 7.74408C12.0983 7.5878 11.8864 7.5 11.6654 7.5C11.4444 7.5 11.2324 7.5878 11.0761 7.74408C10.9198 7.90036 10.832 8.11232 10.832 8.33333V14.1667C10.832 14.3877 10.9198 14.5996 11.0761 14.7559C11.2324 14.9122 11.4444 15 11.6654 15C11.8864 15 12.0983 14.9122 12.2546 14.7559C12.4109 14.5996 12.4987 14.3877 12.4987 14.1667Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- Empty State -->
                        <ng-template #emptyState>
                          <div
                            class="bg-white min-h-80 flex items-center justify-center"
                          >
                            <div class="text-center py-12">
                              <p class="text-[#878A99] text-lg">
                                No social media links added. Click "Add Social
                                Media" to get started.
                              </p>
                            </div>
                          </div>
                        </ng-template>
                      </div>
                    </div>
                  </div>

                  <!-- Image Gallery Content -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] === 'image-gallery'
                    "
                    class="bg-white rounded shadow-md border border-[#E9E9E9]"
                  >
                    <!-- Header -->
                    <div class="bg-[#F5F5F5] border border-[#CED4DA] rounded-t">
                      <div
                        class="flex items-center justify-between px-6 py-4 gap-6"
                      >
                        <h2
                          class="text-xl font-medium text-[#686868] whitespace-nowrap"
                        >
                          Image Gallery
                        </h2>
                        <button
                          (click)="openImageGalleryModal()"
                          class="flex items-center gap-2 px-4 h-11 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors whitespace-nowrap"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5V19"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M5 12H19"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <span>Add Image</span>
                        </button>
                      </div>
                    </div>

                    <!-- Gallery Grid -->
                    <div class="p-6">
                      <div
                        *ngIf="galleryImages.length === 0"
                        class="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div
                          class="w-16 h-16 mb-4 flex items-center justify-center bg-[#F0F7FB] rounded-lg"
                        >
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_258_4081)">
                              <path
                                d="M28.25 0H3.75C1.68225 0 0 1.68225 0 3.75V28.25C0 30.3177 1.68225 32 3.75 32H28.25C30.3177 32 32 30.3177 32 28.25V3.75C32 1.68225 30.3177 0 28.25 0ZM3.75 2.5H28.25C28.9393 2.5 29.5 3.06075 29.5 3.75V22.1072L25.2454 17.8526C23.7833 16.3905 21.4042 16.3905 19.9421 17.8526L18.5625 19.2323L14.6829 15.3526C13.2208 13.8905 10.8418 13.8905 9.37956 15.3526L2.5 22.2322V3.75C2.5 3.06075 3.06075 2.5 3.75 2.5ZM28.25 29.5H3.75C3.06075 29.5 2.5 28.9393 2.5 28.25V25.7678L11.1473 17.1204C11.6348 16.6331 12.4277 16.6331 12.9151 17.1204L18.5625 22.7677L21.7099 19.6204C22.1972 19.133 22.9902 19.133 23.4776 19.6204L29.5 25.6428V28.25C29.5 28.9393 28.9393 29.5 28.25 29.5ZM20.25 12.5C22.3177 12.5 24 10.8177 24 8.75C24 6.68225 22.3177 5 20.25 5C18.1823 5 16.5 6.68225 16.5 8.75C16.5 10.8177 18.1823 12.5 20.25 12.5ZM20.25 7.5C20.9393 7.5 21.5 8.06075 21.5 8.75C21.5 9.43925 20.9393 10 20.25 10C19.5607 10 19 9.43925 19 8.75C19 8.06075 19.5607 7.5 20.25 7.5Z"
                                fill="#049AD0"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_258_4081">
                                <rect width="32" height="32" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p class="text-[#878A99] text-lg">
                          No images added. Click "Add Image" to get started.
                        </p>
                      </div>

                      <div
                        *ngIf="galleryImages.length > 0"
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      >
                        <div
                          *ngFor="let image of galleryImages"
                          class="flex flex-col group"
                        >
                          <!-- Image Card -->
                          <div
                            class="bg-white border border-[#E7E7E7] rounded-[4px] overflow-hidden"
                          >
                            <!-- Image Container -->
                            <div
                              class="relative w-full bg-gray-100 overflow-hidden"
                              style="aspect-ratio: 274/152;"
                            >
                              <img
                                [src]="image.imageUrl"
                                [alt]="image.title"
                                class="w-full h-full object-cover rounded-[4px] m-[11px] box-content"
                                style="width: calc(100% - 22px); height: calc(100% - 22px);"
                              />

                              <!-- Actions Overlay -->
                              <div
                                class="absolute top-[11px] right-[11px] flex gap-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <!-- Edit Button -->
                                <button
                                  (click)="editGalleryImage(image)"
                                  class="w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center hover:opacity-90 transition-opacity"
                                  style="filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.05));"
                                  aria-label="Edit image"
                                >
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M15.3215 1.96389C14.4716 1.11393 13.0936 1.11392 12.2436 1.96389L11.0249 3.18257L5.28916 8.91826C5.19618 9.01126 5.13023 9.12778 5.09833 9.25532L4.37284 12.1573C4.31103 12.4045 4.38347 12.6661 4.56367 12.8462C4.74387 13.0264 5.0054 13.0989 5.25263 13.0371L8.15456 12.3116C8.28218 12.2797 8.39862 12.2137 8.49162 12.1207L14.1856 6.42676L15.446 5.16636C16.296 4.31639 16.296 2.93833 15.446 2.08836L15.3215 1.96389ZM13.2696 2.98989C13.5529 2.70657 14.0122 2.70657 14.2955 2.98989L14.42 3.11436C14.7033 3.39768 14.7033 3.85704 14.42 4.14036L13.6826 4.87784L12.5542 3.70531L13.2696 2.98989ZM11.5279 4.73149L12.6564 5.90402L7.60776 10.9527L6.07376 11.3362L6.45725 9.80219L11.5279 4.73149ZM2.9002 5.80383C2.9002 5.40316 3.22502 5.07834 3.62569 5.07834H7.25314C7.65383 5.07834 7.97863 4.75353 7.97863 4.35285C7.97863 3.95218 7.65383 3.62736 7.25314 3.62736H3.62569C2.42366 3.62736 1.44922 4.6018 1.44922 5.80383V13.7842C1.44922 14.9863 2.42366 15.9607 3.62569 15.9607H11.6061C12.8081 15.9607 13.7826 14.9863 13.7826 13.7842V10.1567C13.7826 9.75613 13.4578 9.43125 13.0571 9.43125C12.6564 9.43125 12.3316 9.75613 12.3316 10.1567V13.7842C12.3316 14.1849 12.0068 14.5097 11.6061 14.5097H3.62569C3.22502 14.5097 2.9002 14.1849 2.9002 13.7842V5.80383Z"
                                      fill="#282A36"
                                    />
                                  </svg>
                                </button>

                                <!-- Delete Button -->
                                <button
                                  (click)="deleteGalleryImage(image.id)"
                                  class="w-[35px] h-[35px] rounded-full bg-[#BF0505] flex items-center justify-center hover:bg-[#a00404] transition-colors"
                                  style="filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.05));"
                                  aria-label="Delete image"
                                >
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clip-path="url(#clip0_1690_9368)">
                                      <path
                                        d="M13.7847 5.07837C13.5923 5.07837 13.4078 5.1548 13.2717 5.29086C13.1356 5.42692 13.0592 5.61145 13.0592 5.80386V13.9228C13.0384 14.2897 12.8735 14.6335 12.6003 14.8793C12.3272 15.1251 11.968 15.253 11.601 15.2352H5.81156C5.44453 15.253 5.08533 15.1251 4.8122 14.8793C4.53907 14.6335 4.37414 14.2897 4.35332 13.9228V5.80386C4.35332 5.61145 4.27689 5.42692 4.14083 5.29086C4.00478 5.1548 3.82025 5.07837 3.62783 5.07837C3.43542 5.07837 3.25089 5.1548 3.11484 5.29086C2.97878 5.42692 2.90234 5.61145 2.90234 5.80386V13.9228C2.92305 14.6746 3.24084 15.3875 3.78612 15.9055C4.3314 16.4234 5.05971 16.7042 5.81156 16.6862H11.601C12.3528 16.7042 13.0811 16.4234 13.6264 15.9055C14.1717 15.3875 14.4895 14.6746 14.5102 13.9228V5.80386C14.5102 5.61145 14.4338 5.42692 14.2977 5.29086C14.1616 5.1548 13.9771 5.07837 13.7847 5.07837Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M14.5091 2.90206H11.6072V1.45108C11.6072 1.25866 11.5307 1.07413 11.3947 0.938077C11.2586 0.802021 11.0741 0.725586 10.8817 0.725586H6.52872C6.33631 0.725586 6.15178 0.802021 6.01572 0.938077C5.87967 1.07413 5.80323 1.25866 5.80323 1.45108V2.90206H2.90127C2.70886 2.90206 2.52433 2.97849 2.38827 3.11455C2.25222 3.2506 2.17578 3.43513 2.17578 3.62755C2.17578 3.81996 2.25222 4.00449 2.38827 4.14055C2.52433 4.2766 2.70886 4.35304 2.90127 4.35304H14.5091C14.7015 4.35304 14.8861 4.2766 15.0221 4.14055C15.1582 4.00449 15.2346 3.81996 15.2346 3.62755C15.2346 3.43513 15.1582 3.2506 15.0221 3.11455C14.8861 2.97849 14.7015 2.90206 14.5091 2.90206ZM7.25421 2.90206V2.17657H10.1562V2.90206H7.25421Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M7.98223 12.3332V7.25479C7.98223 7.06238 7.90579 6.87784 7.76974 6.74179C7.63368 6.60573 7.44915 6.5293 7.25674 6.5293C7.06433 6.5293 6.8798 6.60573 6.74374 6.74179C6.60769 6.87784 6.53125 7.06238 6.53125 7.25479V12.3332C6.53125 12.5256 6.60769 12.7102 6.74374 12.8462C6.8798 12.9823 7.06433 13.0587 7.25674 13.0587C7.44915 13.0587 7.63368 12.9823 7.76974 12.8462C7.90579 12.7102 7.98223 12.5256 7.98223 12.3332Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M10.8807 12.3332V7.25479C10.8807 7.06238 10.8042 6.87784 10.6682 6.74179C10.5321 6.60573 10.3476 6.5293 10.1552 6.5293C9.96277 6.5293 9.77823 6.60573 9.64218 6.74179C9.50612 6.87784 9.42969 7.06238 9.42969 7.25479V12.3332C9.42969 12.5256 9.50612 12.7102 9.64218 12.8462C9.77823 12.9823 9.96277 13.0587 10.1552 13.0587C10.3476 13.0587 10.5321 12.9823 10.6682 12.8462C10.8042 12.7102 10.8807 12.5256 10.8807 12.3332Z"
                                        fill="white"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_1690_9368">
                                        <rect
                                          width="17.4118"
                                          height="17.4118"
                                          fill="white"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <!-- Image Title -->
                            <div class="p-4 text-center">
                              <h3
                                class="text-base font-medium text-[#282A36] line-clamp-2"
                              >
                                {{ image.title }}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Other Features Placeholder -->
                  <div
                    *ngIf="
                      activeFeatures.length > 0 &&
                      activeFeatures[selectedFeatureIndex] !== 'schedule' &&
                      activeFeatures[selectedFeatureIndex] !== 'exhibitor' &&
                      activeFeatures[selectedFeatureIndex] !== 'about' &&
                      activeFeatures[selectedFeatureIndex] !== 'information' &&
                      activeFeatures[selectedFeatureIndex] !== 'speakers' &&
                      activeFeatures[selectedFeatureIndex] !== 'sponsors' &&
                      activeFeatures[selectedFeatureIndex] !== 'social-media' &&
                      activeFeatures[selectedFeatureIndex] !== 'image-gallery'
                    "
                    class="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div
                      class="w-24 h-24 mb-6 flex items-center justify-center bg-[#F0F7FB] rounded-lg"
                      [innerHTML]="
                        getFeatureIcon(activeFeatures[selectedFeatureIndex])
                      "
                    ></div>
                    <h3 class="text-2xl font-bold text-[#181C32] mb-3">
                      {{
                        getFeatureLabel(activeFeatures[selectedFeatureIndex])
                      }}
                    </h3>
                    <p class="text-base text-[#686868] max-w-lg mb-6">
                      Configure the content and settings for the
                      {{
                        getFeatureLabel(activeFeatures[selectedFeatureIndex])
                      }}
                      feature.
                    </p>
                    <div
                      class="bg-[#E8F4F8] border border-[#49B5D8] rounded-lg p-4 max-w-lg text-left"
                    >
                      <p class="text-sm text-[#049AD0] font-medium">
                        💡 Content configuration for
                        <strong>{{
                          getFeatureLabel(activeFeatures[selectedFeatureIndex])
                        }}</strong>
                        will be available in the next release.
                      </p>
                    </div>
                  </div>

                  <!-- No Features Selected -->
                  <div
                    *ngIf="activeFeatures.length === 0"
                    class="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="mb-6 opacity-30"
                    >
                      <path
                        d="M28 4H4C2.89543 4 2 4.89543 2 6V26C2 27.1046 2.89543 28 4 28H28C29.1046 28 30 27.1046 30 26V6C30 4.89543 29.1046 4 28 4ZM28 10H4V6H28V10ZM4 26V14H28V26H4Z"
                        fill="#CED4DA"
                      />
                      <path d="M8 18H12V22H8V18Z" fill="#CED4DA" />
                      <path d="M16 18H20V22H16V18Z" fill="#CED4DA" />
                      <path d="M24 18H28V22H24V18Z" fill="#CED4DA" />
                    </svg>
                    <h3 class="text-xl font-semibold text-[#878A99] mb-2">
                      No Features Selected
                    </h3>
                    <p class="text-base text-[#686868] max-w-md">
                      Go back to the Event Features tab and select features to
                      configure their content.
                    </p>
                  </div>
                </div>

                <!-- Footer with Back and Next buttons -->
                <div
                  class="px-8 py-6 border-t border-[#CED4DA] flex justify-between items-center"
                >
                  <button
                    (click)="onBack()"
                    class="flex items-center gap-2 px-5 py-2 bg-[#DEE1EB] hover:bg-[#CED3E0] text-[#4C546C] rounded font-semibold transition-colors"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.25 9H3.75"
                        stroke="#4C546C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 14.25L3.75 9L9 3.75"
                        stroke="#4C546C"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>Back</span>
                  </button>

                  <button
                    (click)="onNext()"
                    class="flex items-center gap-2 px-5 py-2 bg-[#009FD8] hover:bg-[#0385b5] text-white rounded font-semibold transition-colors"
                    [disabled]="
                      selectedFeatureIndex >= activeFeatures.length - 1
                    "
                    [ngClass]="{
                      'opacity-50 cursor-not-allowed':
                        selectedFeatureIndex >= activeFeatures.length - 1,
                    }"
                  >
                    <span>Next</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 9H14.25"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 3.75L14.25 9L9 14.25"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add Schedule Modal -->
    <app-add-schedule-modal
      [isOpen]="isScheduleModalOpen"
      [editMode]="editMode"
      [scheduleData]="editingSchedule"
      (close)="closeScheduleModal()"
      (save)="onScheduleSave($event)"
    ></app-add-schedule-modal>

    <!-- Add Exhibitor Modal -->
    <app-add-exhibitor-modal
      [isOpen]="isExhibitorModalOpen"
      [editMode]="editModeExhibitor"
      [exhibitorData]="editingExhibitor"
      (close)="closeExhibitorModal()"
      (save)="onExhibitorSave($event)"
    ></app-add-exhibitor-modal>

    <app-confirm-delete-modal
      [isOpen]="isDeleteModalOpen"
      (confirm)="confirmDelete()"
      (cancel)="closeDeleteModal()"
    ></app-confirm-delete-modal>

    <!-- About Detail Modal -->
    <app-about-detail-modal
      [isOpen]="editAboutContent"
      [initialTitle]="aboutTitle"
      [initialDescription]="aboutDescription"
      (close)="editAboutContent = false"
      (save)="onAboutSave($event)"
    ></app-about-detail-modal>

    <!-- Add Information Modal -->
    <app-add-information-modal
      [isOpen]="isInformationModalOpen"
      [editMode]="editModeInformation"
      [informationData]="editingInformation"
      (close)="closeInformationModal()"
      (save)="onInformationSave($event)"
    ></app-add-information-modal>

    <!-- Add Speakers Modal -->
    <app-add-speakers-modal
      [isOpen]="isAddSpeakersModalOpen"
      [editMode]="editModeSpeaker"
      [speakerData]="editingSpeaker"
      (close)="closeAddSpeakersModal()"
      (save)="onSpeakerSave($event)"
    ></app-add-speakers-modal>

    <!-- Add Sponsors Modal -->
    <app-add-sponsors-modal
      [isOpen]="isSponsorsModalOpen"
      [editMode]="editModeSponsor"
      [eventId]="eventId"
      [sponsorData]="editingSponsor"
      (close)="closeSponsorsModal()"
      (submit)="onSponsorSave($event)"
    ></app-add-sponsors-modal>

    <!-- Add Social Media Modal -->
    <app-add-social-media-modal
      [isOpen]="isSocialMediaModalOpen"
      [editMode]="editModeSocialMedia"
      [socialMediaData]="editingSocialMedia"
      (close)="closeSocialMediaModal()"
      (submit)="onSocialMediaSave($event)"
    ></app-add-social-media-modal>

    <!-- Add Image Gallery Modal -->
    <app-add-image-gallery-modal
      [isOpen]="isImageGalleryModalOpen"
      [editingImage]="editingGalleryImage"
      (close)="closeImageGalleryModal()"
      (save)="onImageGallerySave($event)"
    ></app-add-image-gallery-modal>
  `,
  styles: [
    `
      .feature-card {
        min-height: 120px;
      }

      .feature-active {
        background-color: #049ad0 !important;
        border-color: #049ad0 !important;
      }

      .feature-active span {
        color: white !important;
      }
    `,
  ],
})
export class EventSetupComponent implements OnInit {
  eventName = "ENGIMACH 2023";
  activeRoute = "/event/setup";
  backButtonLabel = "Back to KQOL Communication";
  currentTab: "details" | "features" | "content" = "details";

  formData = {
    eventName: "14th Engimach",
    logo: null as File | null,
    banner: null as File | null,
    welcomeMessage:
      "Over the years, ENGIMACH has been one of the prime contributors to the development of the machine tools industry, that enables its participants and visitors with cutting edge and power house technology that stands for engineering excellence, innovation, quality and reliability. ENGIMACH is not just a trade show but a platform to see, understand and learn where the industry is heading to. The showcase at ENGIMACH shall offer a quintessential launch pad for new ideas, products and services, a conducive environment for forging joint ventures, collaborations and an open marketplace to source ideal solutions with an anticipated 1,00,000 visitors and beneficiaries",
    bannerType: "Banner",
    visibility: "Public",
    startDate: "15/05/2023",
    endDate: "31/05/2023",
    timeZone: "(GMT+05:30) Mumbai",
    venue:
      "Exhibition Centre, Swarnim Park, Near Jilla panchayat, Sector 17, Gandhinagar, Gujarat 382016",
    city: "Gandhinagar",
    state: "Gujarat",
    country: "India",
  };

  logoPreview: string | null = null;
  bannerPreview: string | null = null;

  isScheduleModalOpen = false;
  isExhibitorModalOpen = false;
  isAddSpeakersModalOpen = false;
  isInformationModalOpen = false;
  isSponsorsModalOpen = false;
  isSocialMediaModalOpen = false;
  isImageGalleryModalOpen = false;
  editAboutContent = false;
  eventId: string = "";
  schedules: Schedule[] = [];
  exhibitors: Exhibitor[] = [];
  speakers: Speaker[] = [];
  information: Information[] = [];
  sponsors: Sponsor[] = [];
  socialMediaList: SocialMediaEntry[] = [];
  galleryImages: GalleryImage[] = [];
  searchQuery: string = "";
  editMode = false;
  editModeExhibitor = false;
  editModeSpeaker = false;
  editModeInformation = false;
  editModeSponsor = false;
  editModeSocialMedia = false;
  editingSchedule: any = null;
  editingExhibitor: any = null;
  editingSpeaker: any = null;
  editingInformation: any = null;
  editingSponsor: any = null;
  isDeleteModalOpen = false;
  scheduleToDelete: string | null = null;
  exhibitorToDelete: string | null = null;
  speakerToDelete: string | null = null;
  informationToDelete: string | null = null;
  sponsorToDelete: string | null = null;
  socialMediaToDelete: string | null = null;
  galleryImageToDelete: string | null = null;
  editingSocialMedia: SocialMediaEntry | null = null;
  editingGalleryImage: GalleryImage | null = null;
  aboutTitle: string = "About ENGIMACH 2023";
  aboutDescription: string =
    "After the rousing success of the 2021 edition, the expectations from ENGIMACH 2023 have also risen. India is the only large economy expected to grow significantly in the coming years. India is also fast emerging as a preferred manufacturing base in a world seeking reliable supply chains. On the other hand, Indian industry seeks more foreign investments, technology, exports and domestic demand. In this context, ENGIMACH 2023 is expected to be a major catalyst of economic growth and generate significant and lasting business outcomes.";

  activeFeatures: string[] = [
    "schedule",
    "exhibitor",
    "about",
    "information",
    "speakers",
    "sponsors",
    "social-media",
  ];
  draggedFeatureId: string | null = null;
  isDragOverSelected = false;
  selectedFeatureIndex = 0;

  inactiveFeatures = [
    {
      id: "exhibitor",
      label: "Exhibitor",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8241 14.8378C22.8716 13.3445 24.205 10.9277 24.205 8.20512C24.205 3.68081 20.5242 0 15.9999 0C11.4756 0 7.79474 3.68081 7.79474 8.20512C7.79474 10.9277 9.12805 13.3445 11.1757 14.8378C6.08568 16.7856 2.46143 21.7207 2.46143 27.4872C2.46143 29.9756 4.48586 32 6.97424 32H25.0255C27.5139 32 29.5383 29.9756 29.5383 27.4872C29.5383 21.7207 25.9141 16.7856 20.8241 14.8378ZM10.2563 8.20512C10.2563 5.03813 12.8329 2.46156 15.9999 2.46156C19.1669 2.46156 21.7434 5.03813 21.7434 8.20512C21.7434 11.3721 19.1669 13.9487 15.9999 13.9487C12.8329 13.9487 10.2563 11.3721 10.2563 8.20512ZM25.0255 29.5384H6.97424C5.84318 29.5384 4.92299 28.6182 4.92299 27.4871C4.92299 21.3792 9.89199 16.4102 15.9999 16.4102C22.1079 16.4102 27.0769 21.3792 27.0769 27.4871C27.0768 28.6182 26.1566 29.5384 25.0255 29.5384Z" fill="#686868"/></svg>`,
    },
    {
      id: "about",
      label: "About",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6668 2.66663H8.00016C7.29292 2.66663 6.61464 2.94758 6.11454 3.44767C5.61445 3.94777 5.3335 4.62605 5.3335 5.33329V26.6666C5.3335 27.3739 5.61445 28.0521 6.11454 28.5522C6.61464 29.0523 7.29292 29.3333 8.00016 29.3333H24.0002C24.7074 29.3333 25.3857 29.0523 25.8858 28.5522C26.3859 28.0521 26.6668 27.3739 26.6668 26.6666V10.6666L18.6668 2.66663Z" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.6665 2.66663V10.6666H26.6665" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.3332 17.3334H10.6665" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.3332 22.6666H10.6665" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.3332 12H11.9998H10.6665" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      id: "information",
      label: "Information",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="15" stroke="#686868" stroke-width="2"/><circle cx="16" cy="9" r="1.5" fill="#686868"/><path d="M16 13V23" stroke="#686868" stroke-width="2" stroke-linecap="round"/></svg>`,
    },
    {
      id: "speakers",
      label: "Speakers",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.9361 12.6196L17.3324 2.01581C16.2362 0.919565 14.4523 0.919502 13.356 2.01581C12.3705 3.00125 12.2856 4.50418 13.0134 5.57737L12.9986 5.65118C12.2341 9.47399 10.3729 12.9517 7.61613 15.7085L2.75245 20.5722C1.65357 21.6711 1.65339 23.4496 2.75245 24.5485L5.40332 27.1994C6.50213 28.2983 8.28075 28.2983 9.37968 27.1994L10.0424 26.5366L14.6815 31.1758C15.7804 32.2747 17.5589 32.2748 18.6579 31.1758C19.7542 30.0795 19.7542 28.2957 18.6579 27.1995L16.6697 25.2113L17.3324 24.5485C18.4313 23.4497 18.4314 21.6712 17.3324 20.5722L16.882 20.1218C19.0976 18.5706 21.6138 17.4907 24.3008 16.9532L24.3756 16.9383C25.4727 17.679 26.9721 17.5599 27.9361 16.5958H27.9362C29.0323 15.4997 29.0323 13.7159 27.9361 12.6196ZM8.05425 25.874C7.688 26.2401 7.095 26.2402 6.72875 25.8739L4.07788 23.223C3.71157 22.8566 3.71157 22.2639 4.07788 21.8976L8.71694 17.2585L12.6933 21.2348C12.2394 21.6887 8.51931 25.4088 8.05425 25.874ZM17.3324 28.5248C17.6977 28.8902 17.6977 29.4848 17.3324 29.8503C16.967 30.2156 16.3723 30.2156 16.0069 29.8503L11.3678 25.2111L12.6933 23.8857L17.3324 28.5248ZM14.0187 22.5603C14.3005 22.2785 14.7222 21.847 15.3879 21.2785L16.0069 21.8976C16.3732 22.2639 16.3732 22.8566 16.0069 23.223L15.3442 23.8858L14.0187 22.5603ZM14.0586 19.9493L10.0024 15.8932C12.1761 13.3832 13.7327 10.4204 14.5655 7.20168L22.75 15.3862C19.5313 16.2189 16.5685 17.7755 14.0586 19.9493ZM26.6105 15.2704C26.2442 15.6366 25.6514 15.6366 25.2851 15.2704L14.6814 4.66668C14.3151 4.30031 14.3151 3.70756 14.6814 3.34125C15.0477 2.97494 15.6406 2.97494 16.0069 3.34125L26.6105 13.9449C26.9759 14.3103 26.9759 14.9049 26.6105 15.2704Z" fill="#686868"/><path d="M9.37947 20.5721C9.01353 20.2061 8.42004 20.2061 8.05404 20.5721L6.7286 21.8975C6.3626 22.2635 6.3626 22.857 6.7286 23.223C7.09454 23.589 7.6881 23.589 8.05404 23.223L9.37947 21.8975C9.74547 21.5315 9.74547 20.9381 9.37947 20.5721Z" fill="#686868"/><path d="M21.637 0C21.1193 0 20.6997 0.419624 20.6997 0.937248V2.81174C20.6997 3.32937 21.1193 3.74899 21.637 3.74899C22.1546 3.74899 22.5742 3.32937 22.5742 2.81174V0.937248C22.5742 0.419624 22.1546 0 21.637 0Z" fill="#686868"/><path d="M29.135 7.4978H27.2605C26.7429 7.4978 26.3232 7.91743 26.3232 8.43505C26.3232 8.95268 26.7429 9.3723 27.2605 9.3723H29.135C29.6526 9.3723 30.0722 8.95268 30.0722 8.43505C30.0722 7.91743 29.6525 7.4978 29.135 7.4978Z" fill="#686868"/><path d="M27.9232 2.14889C27.5572 1.78289 26.9637 1.78289 26.5977 2.14889L24.7232 4.02339C24.3572 4.38938 24.3572 4.98282 24.7232 5.34882C25.0892 5.71482 25.6827 5.71488 26.0487 5.34882L27.9232 3.47432C28.2892 3.10832 28.2892 2.51495 27.9232 2.14889Z" fill="#686868"/></svg>`,
    },
    {
      id: "sponsors",
      label: "Sponsors",
      icon: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_258_4064)"><path d="M35.963 23.3473C35.3686 19.9998 33.1472 17.312 30.218 16.0653C31.5179 14.9752 32.3482 13.3245 32.3482 11.4804C32.3482 8.20514 29.7302 5.54041 26.512 5.54041C23.2938 5.54041 20.6758 8.20487 20.6758 11.4804C20.6758 13.3256 21.5069 14.9768 22.8082 16.0672C22.3226 16.2743 21.8521 16.5215 21.4028 16.8096C20.2704 17.5358 19.3036 18.4922 18.5584 19.6122C17.8001 19.1085 16.9846 18.6894 16.125 18.3678C17.9726 17.0321 19.1805 14.8359 19.1805 12.3577C19.1805 8.29633 15.9365 4.99219 11.9491 4.99219C7.96157 4.99219 4.71758 8.29633 4.71758 12.3577C4.71758 14.8359 5.92553 17.0321 7.77316 18.3678C3.84115 19.8388 0.825401 23.3372 0.0431742 27.7416C-0.101296 28.5559 0.120628 29.3865 0.651542 30.0204C1.17751 30.648 1.94491 31.0078 2.75707 31.0078H21.141C21.9532 31.0078 22.7206 30.648 23.2466 30.0204C23.7778 29.3865 23.9994 28.5559 23.8549 27.7416C23.7585 27.1983 23.6278 26.669 23.466 26.1557H33.6273C34.3266 26.1557 34.9874 25.8459 35.44 25.3059C35.8965 24.7613 36.0871 24.0472 35.963 23.3473ZM22.7852 11.4804C22.7852 9.36804 24.457 7.64978 26.512 7.64978C28.567 7.64978 30.2388 9.36804 30.2388 11.4804C30.2388 13.5926 28.567 15.3108 26.512 15.3108C24.457 15.3108 22.7852 13.5926 22.7852 11.4804ZM6.82696 12.3577C6.82696 9.4595 9.12475 7.10156 11.9491 7.10156C14.7734 7.10156 17.0714 9.4595 17.0714 12.3577C17.0714 15.2559 14.7734 17.6138 11.9491 17.6138C9.12475 17.6138 6.82696 15.2559 6.82696 12.3577ZM21.6299 28.6655C21.5569 28.7526 21.3965 28.8984 21.141 28.8984H2.75707C2.50164 28.8984 2.34124 28.7526 2.26818 28.6655C2.19238 28.5749 2.07207 28.3821 2.12014 28.1102C2.98312 23.2506 7.11672 19.7232 11.9491 19.7232C16.7814 19.7232 20.9153 23.2506 21.778 28.1102C21.8263 28.3821 21.706 28.5749 21.6299 28.6655ZM33.8234 23.951C33.7935 23.9867 33.7284 24.0463 33.6276 24.0463H22.5794C21.9554 22.8771 21.154 21.8282 20.2138 20.9334C21.5876 18.7479 23.9357 17.4202 26.512 17.4202C30.1372 17.4202 33.2381 20.0679 33.886 23.7162C33.9063 23.8313 33.8555 23.9128 33.8234 23.951Z" fill="#686868"/></g><defs><clipPath id="clip0_258_4064"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "social-media",
      label: "Social Media",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.5664 9.50664H25.3135V12.4552C25.3135 12.7114 25.5211 12.9191 25.7773 12.9191C26.0336 12.9191 26.2412 12.7114 26.2412 12.4552V9.50664H26.9882C27.2444 9.50664 27.452 9.29902 27.452 9.04278C27.452 8.78654 27.2444 8.57892 26.9882 8.57892H26.2412V7.23124C26.2412 6.97222 26.4518 6.76157 26.7109 6.76157H27.81C28.0663 6.76157 28.2739 6.55394 28.2739 6.2977C28.2739 6.04147 28.0663 5.83384 27.81 5.83384H26.7109C25.9404 5.83384 25.3135 6.46073 25.3135 7.23124V8.57892H24.5664C24.3102 8.57892 24.1025 8.78654 24.1025 9.04278C24.1025 9.29902 24.3102 9.50664 24.5664 9.50664ZM16.1668 2.52087C16.423 2.52087 16.6307 2.31319 16.6307 2.05701C16.6307 1.80084 16.423 1.59315 16.1668 1.59315C15.9107 1.59315 15.703 1.80084 15.703 2.05701C15.703 2.31319 15.9106 2.52087 16.1668 2.52087ZM6.14537 10.5806C6.91266 10.5806 7.53696 9.95628 7.53696 9.18899C7.53696 8.4217 6.91266 7.7974 6.14537 7.7974C5.37808 7.7974 4.75378 8.4217 4.75378 9.18899C4.75378 9.95628 5.37808 10.5806 6.14537 10.5806ZM6.14537 8.72512C6.40117 8.72512 6.60923 8.93318 6.60923 9.18899C6.60923 9.44479 6.40117 9.65285 6.14537 9.65285C5.88957 9.65285 5.68151 9.44479 5.68151 9.18899C5.68151 8.93318 5.88963 8.72512 6.14537 8.72512ZM8.00082 12.436C8.76811 12.436 9.39241 11.8117 9.39241 11.0444V7.33354C9.39241 6.56625 8.76811 5.94195 8.00082 5.94195H4.28992C3.52263 5.94195 2.89833 6.56625 2.89833 7.33354V11.0444C2.89833 11.8117 3.52263 12.436 4.28992 12.436H8.00082ZM3.82606 11.0444V7.33354C3.82606 7.07773 4.03412 6.86968 4.28992 6.86968H8.00082C8.25662 6.86968 8.46468 7.07773 8.46468 7.33354V11.0444C8.46468 11.3002 8.25662 11.5083 8.00082 11.5083H4.28992C4.03418 11.5083 3.82606 11.3002 3.82606 11.0444ZM8.95662 19.3072C8.73143 19.1378 8.43339 19.1094 8.17863 19.2328C8.11617 19.263 8.05054 19.2859 7.98356 19.3009C7.9018 19.3192 7.81855 19.326 7.73469 19.3209C7.46132 19.0696 7.11348 18.9193 6.73763 18.8931C6.29956 18.8621 5.87503 19.0046 5.54328 19.293C5.23725 19.5592 5.04292 19.925 4.9914 20.3213C4.45165 20.2343 3.95718 19.9611 3.59252 19.5392C3.44291 19.3659 3.2111 19.2885 2.98814 19.3368C2.76629 19.3848 2.58872 19.5501 2.52471 19.7679C2.36867 20.298 2.03932 21.9219 3.41013 23.0047C3.14851 23.0844 2.85016 23.0784 2.69758 23.3434C2.56002 23.5823 2.63356 23.8636 2.68966 24.0101C2.79925 24.2962 3.08524 24.5022 3.53952 24.6222C3.78747 24.6878 4.11155 24.7302 4.47677 24.7302C5.32384 24.7301 6.39128 24.5021 7.23718 23.8064C8.08023 23.113 8.42497 22.1677 8.56401 21.4505C8.78042 21.2038 8.95186 20.9254 9.07451 20.621C9.1512 20.4305 9.20766 20.2311 9.24249 20.0282C9.2898 19.7516 9.18033 19.4753 8.95662 19.3072ZM7.79827 20.9128C7.73258 20.9806 7.68904 21.0668 7.6737 21.16C7.57901 21.7334 7.3242 22.5337 6.64789 23.0899C5.83019 23.7623 4.67926 23.8567 4.01736 23.7715C4.23822 23.6799 4.44992 23.5661 4.64697 23.4323C4.78632 23.3377 4.8635 23.1751 4.84853 23.0073C4.83357 22.8395 4.7288 22.6931 4.57486 22.6246C3.41984 22.1112 3.23788 21.2373 3.30963 20.5518C3.91005 21.0382 4.6659 21.3 5.4536 21.2779C5.70501 21.2714 5.90546 21.0657 5.90546 20.8142V20.5504C5.90546 20.5484 5.90546 20.5463 5.9054 20.5441C5.90255 20.3326 5.99248 20.1317 6.15211 19.9929C6.29677 19.867 6.48176 19.8053 6.67312 19.8184C6.86442 19.8318 7.03908 19.9188 7.16488 20.0635C7.23235 20.141 7.32352 20.1939 7.42433 20.214C7.69888 20.2686 7.97676 20.2616 8.24506 20.192C8.15037 20.4616 7.99847 20.7061 7.79827 20.9128ZM26.1882 15.9982C26.1772 15.9982 26.1663 15.9986 26.1553 15.9987V15.0003C26.1663 15.0004 26.1772 15.0007 26.1882 15.0007C29.3928 15.0007 32 12.3937 32 9.18899C32 5.97133 29.3718 3.35941 26.1553 3.37766V2.93779C26.1553 1.31793 24.8374 0 23.2175 0H9.11613C7.49626 0 6.17834 1.31793 6.17834 2.93779V3.37766C5.04193 3.37104 3.9393 3.69271 2.98956 4.30792C2.77451 4.4472 2.7131 4.73443 2.85238 4.94941C2.99173 5.16446 3.27889 5.22587 3.49387 5.08659C4.28324 4.57523 5.20014 4.30495 6.14537 4.30495C8.83843 4.30495 11.0294 6.49593 11.0294 9.18899C11.0294 11.882 8.83843 14.073 6.14537 14.073C3.45231 14.073 1.26133 11.882 1.26133 9.18899C1.26133 8.21265 1.54837 7.27045 2.09128 6.46432C2.23433 6.25181 2.17811 5.9636 1.96566 5.82048C1.75315 5.67749 1.46494 5.73365 1.32182 5.9461C0.675383 6.90598 0.33361 8.02729 0.33361 9.18899C0.33361 12.3936 2.9407 15.0007 6.14537 15.0007C6.15638 15.0007 6.16726 15.0004 6.17827 15.0003V16.0101C6.05699 16.0025 5.93484 15.9982 5.8117 15.9982C2.60709 15.9982 0 18.6053 0 21.8099C0 25.0145 2.60709 27.6218 5.81176 27.6218C5.9349 27.6218 6.05705 27.6174 6.17834 27.6099V28.7285C6.17834 30.3484 7.49626 31.6663 9.11613 31.6663H23.2175C24.8374 31.6663 26.1553 30.3484 26.1553 28.7285V27.6214C26.1663 27.6214 26.1772 27.6218 26.1882 27.6218C29.3928 27.6218 32 25.0147 32 21.81C32 18.6053 29.3928 15.9982 26.1882 15.9982ZM26.1882 4.30495C28.8813 4.30495 31.0723 6.49593 31.0723 9.18899C31.0723 11.882 28.8813 14.073 26.1882 14.073C23.4952 14.073 21.3042 11.882 21.3042 9.18899C21.3042 6.49593 23.4952 4.30495 26.1882 4.30495ZM25.2276 14.9208V16.077C24.9105 16.1293 24.6004 16.2075 24.2999 16.3101V14.6855C24.5989 14.7885 24.9089 14.8677 25.2276 14.9208ZM8.03378 3.24697V3.69234C7.73475 3.5893 7.42476 3.51026 7.10606 3.45701V2.93773C7.10606 1.82935 8.00775 0.927663 9.11613 0.927663H23.2175C24.3259 0.927663 25.2276 1.82935 25.2276 2.93773V3.45701C24.9089 3.51026 24.5989 3.5893 24.2999 3.69234V3.24697C24.2999 2.47968 23.6756 1.85539 22.9083 1.85539H21.2044C20.6758 1.85539 20.2457 2.28542 20.2457 2.81404C20.2457 3.01931 20.0787 3.18636 19.8733 3.18636H12.4603C12.255 3.18636 12.0879 3.01937 12.0879 2.81404C12.0879 2.55767 11.9882 2.3169 11.806 2.13476C11.6245 1.95465 11.3842 1.85539 11.1292 1.85539H9.42531C8.65802 1.85539 8.03378 2.47968 8.03378 3.24697ZM7.10606 14.9208C7.42476 14.8676 7.73475 14.7885 8.03378 14.6855V16.44C7.73611 16.3164 7.42612 16.2167 7.10606 16.1436V14.9208ZM5.81176 26.694C3.1187 26.694 0.927724 24.5031 0.927724 21.8099C0.927724 19.1169 3.1187 16.9259 5.81176 16.9259C8.50482 16.9259 10.6958 19.1169 10.6958 21.8099C10.6958 24.6565 8.44879 26.694 5.81176 26.694ZM25.2276 28.7285C25.2276 29.8369 24.3259 30.7385 23.2175 30.7385H9.11613C8.00775 30.7385 7.10606 29.8369 7.10606 28.7285V27.4763C7.42612 27.4032 7.73611 27.3035 8.03378 27.1799V28.4192C8.03378 29.1865 8.65808 29.8108 9.42537 29.8108H22.9083C23.6756 29.8108 24.2999 29.1865 24.2999 28.4192V27.3066C24.5989 27.4096 24.9089 27.4887 25.2276 27.5419V28.7285ZM26.1882 26.694C23.4952 26.694 21.3042 24.5031 21.3042 21.8099C21.3042 21.3914 21.3571 20.976 21.4615 20.5751C21.5261 20.3272 21.3775 20.0739 21.1296 20.0093C20.8817 19.9447 20.6284 20.0934 20.5638 20.3413C20.4395 20.8184 20.3765 21.3126 20.3765 21.8099C20.3765 23.9935 21.5872 25.8993 23.3722 26.8923V28.4192C23.3722 28.675 23.1642 28.8831 22.9084 28.8831H9.42543C9.16963 28.8831 8.96157 28.675 8.96157 28.4192V26.692C10.5622 25.6557 11.6236 23.8545 11.6236 21.8099C11.6236 19.7654 10.5622 17.9641 8.96157 16.9279V14.2712C10.7466 13.2782 11.9573 11.3724 11.9573 9.18893C11.9573 7.00543 10.7466 5.09964 8.96157 4.1066V3.24697C8.96157 2.99117 9.16963 2.78311 9.42543 2.78311H11.1294C11.1381 2.78311 11.1459 2.78651 11.1514 2.79202C11.1593 2.79993 11.1603 2.80841 11.1603 2.81404C11.1603 3.53086 11.7435 4.11409 12.4604 4.11409H19.8735C20.5903 4.11409 21.1736 3.53086 21.1736 2.81404C21.1736 2.79703 21.1875 2.78311 21.2045 2.78311H22.9084C23.1642 2.78311 23.3723 2.99117 23.3723 3.24697V4.1066C21.5872 5.09964 20.3766 7.00543 20.3766 9.18893C20.3766 11.3738 21.5887 13.2806 23.3756 14.2731C23.3736 14.2906 23.3723 14.3084 23.3723 14.3264V16.7217C22.6882 17.101 22.079 17.6211 21.5832 18.2642C21.4268 18.467 21.4644 18.7583 21.6673 18.9148C21.8703 19.0712 22.1614 19.0336 22.3179 18.8306C23.2511 17.6197 24.6418 16.9259 26.1884 16.9259C28.8814 16.9259 31.0724 19.1169 31.0724 21.8099C31.0723 24.5031 28.8813 26.694 26.1882 26.694ZM17.8667 15.6797C17.6477 15.5469 17.3624 15.6166 17.2294 15.8355C17.1434 15.9771 17.0223 16.0984 16.8832 16.1884C16.7491 16.2751 16.5746 16.2775 16.4383 16.1948L15.744 15.7734C15.6056 15.6893 15.5299 15.5279 15.5456 15.3644C15.561 15.2029 15.6137 15.0443 15.6979 14.9057C15.8309 14.6867 15.7612 14.4014 15.5422 14.2684C15.3233 14.1354 15.038 14.2051 14.9049 14.4241C14.7486 14.6815 14.6507 14.9761 14.6219 15.2777L14.621 15.287C14.572 15.7978 14.8238 16.2999 15.2624 16.5664L15.9567 16.9878C16.1702 17.1175 16.4128 17.1821 16.6553 17.1821C16.911 17.1821 17.1666 17.1103 17.3875 16.9671C17.6435 16.8012 17.8642 16.5778 18.0224 16.3171C18.1554 16.0979 18.0856 15.8127 17.8667 15.6797ZM28.6291 21.3126L25.3766 19.4338C24.9559 19.1861 24.4077 19.5081 24.4113 19.991V23.7486C24.407 24.2305 24.9593 24.552 25.3765 24.3059L28.629 22.4272C29.0496 22.1888 29.048 21.5498 28.6291 21.3126ZM25.339 23.2562V20.4835L27.7391 21.8699L25.339 23.2562ZM16.0542 11.6327C13.8985 11.6892 12.1058 13.4186 11.9731 15.5698C11.9392 16.1177 12.0104 16.6573 12.1845 17.174L11.6906 18.5791C11.599 18.8396 11.6634 19.1227 11.8586 19.3179C12.0538 19.5131 12.3369 19.5775 12.5974 19.486L13.577 19.1417C14.3456 19.7442 15.3066 20.0599 16.2832 20.0335C18.5285 19.9726 20.3613 18.0947 20.3687 15.8475C20.3726 14.7014 19.9233 13.6291 19.1037 12.828C18.2843 12.0271 17.2007 11.6019 16.0542 11.6327ZM16.258 19.1061C15.492 19.1255 14.7414 18.8782 14.1424 18.4061C13.9788 18.277 13.7817 18.2099 13.5822 18.2099C13.4827 18.2099 13.3825 18.2266 13.2856 18.2606L12.7153 18.4611L13.0633 17.4711C13.1297 17.2825 13.1311 17.0756 13.0672 16.8884C12.9289 16.4827 12.8723 16.0583 12.8989 15.627C13.0024 13.9512 14.399 12.6041 16.0784 12.56C16.9725 12.5357 17.8166 12.8674 18.4551 13.4914C19.0937 14.1156 19.4438 14.9513 19.4408 15.8442C19.4351 17.5954 18.0072 19.0586 16.258 19.1061Z" fill="#686868"/></svg>`,
    },
    {
      id: "image-gallery",
      label: "Image Gallery",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_258_4081)"><path d="M28.25 0H3.75C1.68225 0 0 1.68225 0 3.75V28.25C0 30.3177 1.68225 32 3.75 32H28.25C30.3177 32 32 30.3177 32 28.25V3.75C32 1.68225 30.3177 0 28.25 0ZM3.75 2.5H28.25C28.9393 2.5 29.5 3.06075 29.5 3.75V22.1072L25.2454 17.8526C23.7833 16.3905 21.4042 16.3905 19.9421 17.8526L18.5625 19.2323L14.6829 15.3526C13.2208 13.8905 10.8418 13.8905 9.37956 15.3526L2.5 22.2322V3.75C2.5 3.06075 3.06075 2.5 3.75 2.5ZM28.25 29.5H3.75C3.06075 29.5 2.5 28.9393 2.5 28.25V25.7678L11.1473 17.1204C11.6348 16.6331 12.4277 16.6331 12.9151 17.1204L18.5625 22.7677L21.7099 19.6204C22.1972 19.133 22.9902 19.133 23.4776 19.6204L29.5 25.6428V28.25C29.5 28.9393 28.9393 29.5 28.25 29.5ZM20.25 12.5C22.3177 12.5 24 10.8177 24 8.75C24 6.68225 22.3177 5 20.25 5C18.1823 5 16.5 6.68225 16.5 8.75C16.5 10.8177 18.1823 12.5 20.25 12.5ZM20.25 7.5C20.9393 7.5 21.5 8.06075 21.5 8.75C21.5 9.43925 20.9393 10 20.25 10C19.5607 10 19 9.43925 19 8.75C19 8.06075 19.5607 7.5 20.25 7.5Z" fill="#686868"/></g><defs><clipPath id="clip0_258_4081"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_258_4093)"><path d="M9.84375 22.9219C9.84375 20.9834 8.26664 19.4062 6.32812 19.4062C4.38961 19.4062 2.8125 20.9834 2.8125 22.9219C2.8125 24.8604 4.38961 26.4375 6.32812 26.4375C8.26664 26.4375 9.84375 24.8604 9.84375 22.9219ZM6.32812 25.0312C5.16502 25.0312 4.21875 24.085 4.21875 22.9219C4.21875 21.7588 5.16502 20.8125 6.32812 20.8125C7.49123 20.8125 8.4375 21.7588 8.4375 22.9219C8.4375 24.085 7.49123 25.0312 6.32812 25.0312Z" fill="#686868"/><path d="M0.703125 32.0625H14.8359C15.2243 32.0625 15.5391 31.7476 15.5391 31.3594C15.5391 30.9711 15.2243 30.6562 14.8359 30.6562H12.7268C13.0535 29.0535 14.4741 27.8438 16.1719 27.8438H19.8281C21.5259 27.8438 22.9464 29.0535 23.2732 30.6562H21.1641C20.7757 30.6562 20.4609 30.9711 20.4609 31.3594C20.4609 31.7476 20.7757 32.0625 21.1641 32.0625H35.2969C35.6852 32.0625 36 31.7476 36 31.3594C36 28.6455 33.792 26.4375 31.0781 26.4375H28.2656C26.4772 26.4375 24.9088 27.3966 24.0469 28.8273C23.185 27.3966 21.6166 26.4375 19.8281 26.4375H16.1719C14.3834 26.4375 12.815 27.3966 11.9531 28.8273C11.0912 27.3966 9.52284 26.4375 7.73438 26.4375H4.92188C2.20795 26.4375 0 28.6455 0 31.3594C0 31.7476 0.314789 32.0625 0.703125 32.0625ZM28.2656 27.8438H31.0781C32.7759 27.8438 34.1964 29.0535 34.5232 30.6562H24.8206C25.1473 29.0535 26.5679 27.8438 28.2656 27.8438ZM4.92188 27.8438H7.73438C9.43214 27.8438 10.8527 29.0535 11.1794 30.6562H1.47684C1.80359 29.0535 3.22411 27.8438 4.92188 27.8438Z" fill="#686868"/><path d="M21.5156 22.9219C21.5156 20.9834 19.9385 19.4062 18 19.4062C16.0615 19.4062 14.4844 20.9834 14.4844 22.9219C14.4844 24.8604 16.0615 26.4375 18 26.4375C19.9385 26.4375 21.5156 24.8604 21.5156 22.9219ZM18 25.0312C16.8369 25.0312 15.8906 24.085 15.8906 22.9219C15.8906 21.7588 16.8369 20.8125 18 20.8125C19.1631 20.8125 20.1094 21.7588 20.1094 22.9219C20.1094 24.085 19.1631 25.0312 18 25.0312Z" fill="#686868"/><path d="M33.1875 22.9219C33.1875 20.9834 31.6104 19.4062 29.6719 19.4062C27.7334 19.4062 26.1562 20.9834 26.1562 22.9219C26.1562 24.8604 27.7334 26.4375 29.6719 26.4375C31.6104 26.4375 33.1875 24.8604 33.1875 22.9219ZM29.6719 25.0312C28.5088 25.0312 27.5625 24.085 27.5625 22.9219C27.5625 21.7588 28.5088 20.8125 29.6719 20.8125C30.835 20.8125 31.7812 21.7588 31.7812 22.9219C31.7812 24.085 30.835 25.0312 29.6719 25.0312Z" fill="#686868"/><path d="M11.6361 11.5932C11.5534 11.3386 11.3334 11.1531 11.0685 11.1145L8.03395 10.6735L6.6767 7.9239C6.55823 7.68393 6.31382 7.53198 6.04621 7.53198C5.7786 7.53198 5.5342 7.68393 5.41572 7.9239L4.05841 10.6735L1.02386 11.1145C0.758994 11.1531 0.538986 11.3386 0.456299 11.5932C0.373611 11.8476 0.442588 12.1271 0.634189 12.3139L2.82977 14.4542L2.31142 17.4762C2.26614 17.74 2.37456 18.0066 2.59113 18.1639C2.80762 18.3211 3.09463 18.3418 3.33159 18.2174L6.046 16.7906C6.54135 17.0511 8.75985 18.2174 8.75985 18.2174C8.99906 18.3432 9.286 18.3197 9.50038 18.1639C9.71695 18.0066 9.82544 17.74 9.78016 17.4762L9.26188 14.4543L11.458 12.3139C11.6498 12.1272 11.7187 11.8477 11.6361 11.5932ZM8.0156 13.7053C7.84987 13.8668 7.77421 14.0995 7.81338 14.3277L8.15334 16.3097C8.15334 16.3097 7.00985 15.7086 6.37352 15.3739C6.16856 15.2661 5.9238 15.266 5.71898 15.3737L3.93824 16.3098L4.2782 14.3277C4.31737 14.0996 4.24171 13.8669 4.07606 13.7053L2.63585 12.3013L4.62646 12.012C4.85547 11.9787 5.0534 11.8348 5.15578 11.6273L6.04621 9.82361L6.93658 11.6273C7.03903 11.8348 7.23695 11.9787 7.46596 12.012L9.4563 12.3013L8.0156 13.7053Z" fill="#686868"/><path d="M35.5437 11.5932C35.461 11.3386 35.2409 11.1531 34.9761 11.1145L31.9416 10.6735L30.5843 7.9239C30.4659 7.68393 30.2215 7.53198 29.9539 7.53198C29.6862 7.53198 29.4418 7.68393 29.3234 7.9239L27.9661 10.6735L24.9316 11.1145C24.6667 11.1531 24.4467 11.3386 24.364 11.5932C24.2813 11.8477 24.3503 12.1272 24.542 12.3139L26.7381 14.4543L26.2198 17.4762C26.1746 17.74 26.2831 18.0066 26.4995 18.1639C26.7162 18.3213 27.0032 18.3418 27.2401 18.2174L29.9539 16.7905L32.6683 18.2174C32.908 18.3434 33.1948 18.3195 33.4088 18.1639C33.6254 18.0066 33.7339 17.74 33.6886 17.4762L33.1702 14.4542L35.3658 12.3139C35.5574 12.1271 35.6264 11.8476 35.5437 11.5932ZM31.9239 13.7053C31.7582 13.8669 31.6826 14.0995 31.7217 14.3277L32.0617 16.3098L30.281 15.3738C30.1786 15.3199 30.0662 15.293 29.9538 15.293C29.8414 15.293 29.729 15.3199 29.6266 15.3737L27.8467 16.3097L28.1866 14.3277C28.2257 14.0996 28.1501 13.8668 27.9843 13.7053L26.5438 12.3013L28.5341 12.012C28.7631 11.9787 28.961 11.8348 29.0635 11.6273L29.9539 9.82361L30.8443 11.6273C30.9467 11.8348 31.1446 11.9787 31.3736 12.012L33.3642 12.3013L31.9239 13.7053Z" fill="#686868"/><path d="M25.0076 9.02876C24.9249 8.77423 24.7048 8.58874 24.44 8.55021L20.426 7.96711L18.6307 4.32949C18.5123 4.08945 18.2679 3.9375 18.0002 3.9375C17.7326 3.9375 17.4882 4.08945 17.3697 4.32942L15.5745 7.96711L11.5605 8.55028C11.2957 8.58881 11.0757 8.7743 10.993 9.02883C10.9102 9.28336 10.9792 9.56278 11.1708 9.7496L14.0751 12.5812L13.3895 16.5791C13.3442 16.8429 13.4526 17.1094 13.6692 17.2667C13.8858 17.4239 14.1727 17.4447 14.4097 17.3203L18.0002 15.4328L21.5909 17.3202C21.8282 17.445 22.1153 17.4236 22.3313 17.2666C22.5479 17.1094 22.6563 16.8428 22.611 16.579L21.9254 12.5811L24.8298 9.74953C25.0214 9.56271 25.0903 9.28329 25.0076 9.02876ZM20.6791 11.8322C20.5134 11.9937 20.4378 12.2264 20.4769 12.4545L20.9842 15.4126L18.3273 14.016C18.2249 13.9622 18.1125 13.9353 18.0002 13.9353C17.8878 13.9353 17.7754 13.9622 17.673 14.016L15.0161 15.4126L15.5234 12.4545C15.5626 12.2264 15.4869 11.9937 15.3213 11.8322L13.1723 9.73709L16.1423 9.30558C16.3713 9.27225 16.5693 9.12839 16.6717 8.9209L18.0002 6.22941L19.3287 8.92097C19.4311 9.12846 19.629 9.27232 19.858 9.30565L22.828 9.73716L20.6791 11.8322Z" fill="#686868"/><path d="M18 32.0625C18.3883 32.0625 18.7031 31.7477 18.7031 31.3594C18.7031 30.971 18.3883 30.6562 18 30.6562C17.6117 30.6562 17.2969 30.971 17.2969 31.3594C17.2969 31.7477 17.6117 32.0625 18 32.0625Z" fill="#686868"/></g><defs><clipPath id="clip0_258_4093"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "web-view",
      label: "Web View",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_258_4120)"><path d="M31.1095 21.2637C31.6857 19.6144 32 17.8433 32 15.9999C32 14.1565 31.6857 12.3854 31.1095 10.7362C31.0954 10.6866 31.0788 10.6383 31.0586 10.5918C28.8363 4.42291 22.9255 0 16.0003 0C9.07506 0 3.16408 4.42291 0.941921 10.5918C0.921738 10.6385 0.904918 10.6866 0.891004 10.7362C0.31486 12.3854 0.000488281 14.1565 0.000488281 15.9999C0.000488281 17.8433 0.31486 19.6144 0.891004 21.2637C0.905071 21.3132 0.921738 21.3615 0.941921 21.408C3.16423 27.5771 9.07506 31.9998 16.0003 31.9998C22.9255 31.9998 28.8363 27.5769 31.0586 21.408C31.0788 21.3615 31.0954 21.3134 31.1095 21.2637ZM16.0003 29.7064C15.3909 29.7064 14.4085 28.6037 13.5874 26.1401C13.1911 24.9513 12.8738 23.5846 12.6426 22.0979H19.3579C19.1267 23.5846 18.8094 24.9511 18.4132 26.1401C17.592 28.6037 16.6096 29.7064 16.0003 29.7064ZM12.3643 19.8043C12.2541 18.5814 12.1958 17.3056 12.1958 15.9999C12.1958 14.6943 12.2541 13.4184 12.3643 12.1955H19.636C19.7463 13.4184 19.8045 14.6943 19.8045 15.9999C19.8045 17.3056 19.7463 18.5814 19.636 19.8043H12.3643ZM2.2939 16.0001C2.2939 14.6805 2.48182 13.4041 2.83151 12.1957H10.0639C9.95671 13.4438 9.90228 14.723 9.90228 16.0001C9.90228 17.2771 9.95656 18.5563 10.0639 19.8045H2.83151C2.48182 18.5959 2.2939 17.3196 2.2939 16.0001ZM16.0003 2.29357C16.6096 2.29357 17.5921 3.39631 18.4132 5.85991C18.8094 7.04874 19.1268 8.4154 19.3579 9.90194H12.6425C12.8737 8.41525 13.1909 7.04874 13.5873 5.85991C14.4085 3.39631 15.3909 2.29357 16.0003 2.29357ZM21.9365 12.1957H29.1689C29.5185 13.4041 29.7065 14.6805 29.7065 16.0001C29.7065 17.3196 29.5185 18.5961 29.1689 19.8045H21.9365C22.0437 18.5563 22.0981 17.2771 22.0981 16.0001C22.0981 14.723 22.0437 13.4438 21.9365 12.1957ZM28.2727 9.90209H21.6733C21.2654 7.08911 20.5655 4.56542 19.5837 2.77002C23.3903 3.80197 26.5439 6.43667 28.2727 9.90209ZM12.4166 2.76986C11.4348 4.56527 10.735 7.08896 10.327 9.90209H3.72769C5.45658 6.43667 8.61008 3.80197 12.4166 2.76986ZM3.72769 22.0979H10.327C10.735 24.9109 11.4348 27.4346 12.4166 29.2301C8.61008 28.198 5.45658 25.5635 3.72769 22.0979ZM19.5837 29.2301C20.5655 27.4347 21.2654 24.911 21.6733 22.0979H28.2727C26.5439 25.5635 23.3903 28.198 19.5837 29.2301Z" fill="#686868"/></g><defs><clipPath id="clip0_258_4120"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "floor-plan",
      label: "Floor Plan",
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.9105 33.8906H31.1281V1.05469C31.1281 0.472219 30.6558 0 30.0734 0H5.92645C5.34398 0 4.87176 0.472219 4.87176 1.05469V33.8906H2.08936C1.50689 33.8906 1.03467 34.3628 1.03467 34.9453C1.03467 35.5278 1.50689 36 2.08936 36H33.9106C34.4931 36 34.9653 35.5278 34.9653 34.9453C34.9653 34.3628 34.4931 33.8906 33.9105 33.8906ZM14.4048 33.8906V26.7004H21.595V33.8906H14.4048ZM23.7044 33.8906V25.6457C23.7044 25.0632 23.2322 24.591 22.6497 24.591H13.3501C12.7676 24.591 12.2954 25.0632 12.2954 25.6457V33.8906H6.98114V2.10938H29.0187V33.8906H23.7044Z" fill="#686868"/><path d="M15.732 4.66235H10.5635C9.98101 4.66235 9.50879 5.13457 9.50879 5.71704V10.8856C9.50879 11.468 9.98101 11.9403 10.5635 11.9403H15.732C16.3145 11.9403 16.7867 11.468 16.7867 10.8856V5.71704C16.7867 5.13457 16.3145 4.66235 15.732 4.66235ZM14.6773 9.83088H11.6182V6.77173H14.6773V9.83088Z" fill="#686868"/><path d="M25.4361 4.66235H20.2676C19.6851 4.66235 19.2129 5.13457 19.2129 5.71704V10.8856C19.2129 11.468 19.6851 11.9403 20.2676 11.9403H25.4361C26.0186 11.9403 26.4908 11.468 26.4908 10.8856V5.71704C26.4908 5.13457 26.0186 4.66235 25.4361 4.66235ZM24.3814 9.83088H21.3223V6.77173H24.3814V9.83088Z" fill="#686868"/><path d="M15.732 14.4812H10.5635C9.98101 14.4812 9.50879 14.9534 9.50879 15.5359V20.7044C9.50879 21.2869 9.98101 21.7591 10.5635 21.7591H15.732C16.3145 21.7591 16.7867 21.2869 16.7867 20.7044V15.5359C16.7867 14.9534 16.3145 14.4812 15.732 14.4812ZM14.6773 19.6497H11.6182V16.5906H14.6773V19.6497Z" fill="#686868"/><path d="M25.4361 14.4812H20.2676C19.6851 14.4812 19.2129 14.9534 19.2129 15.5359V20.7044C19.2129 21.2869 19.6851 21.7591 20.2676 21.7591H25.4361C26.0186 21.7591 26.4908 21.2869 26.4908 20.7044V15.5359C26.4908 14.9534 26.0186 14.4812 25.4361 14.4812ZM24.3814 19.6497H21.3223V16.5906H24.3814V19.6497Z" fill="#686868"/></svg>`,
    },
    {
      id: "category",
      label: "Category",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.1831 2.88319C26.5343 2.23306 25.6716 1.875 24.7536 1.875H23.2031V1.5625C23.2031 0.700938 22.5022 0 21.6406 0H10.3906C9.52906 0 8.82813 0.700938 8.82813 1.5625V1.875H7.27206C5.38075 1.875 3.84031 3.41538 3.83819 5.30869L3.8125 28.5587C3.8115 29.4776 4.16819 30.3417 4.81688 30.9918C5.46563 31.6419 6.32844 32 7.24638 32H24.7279C26.6193 32 28.1597 30.4596 28.1618 28.5663L28.1875 5.31631C28.1886 4.39737 27.8318 3.53325 27.1831 2.88319ZM10.7031 1.875H21.3281V3.75H10.7031V1.875ZM26.2888 28.5642C26.2878 29.4249 25.5876 30.125 24.7279 30.125H7.24638C6.82913 30.125 6.43694 29.9622 6.14206 29.6667C5.84719 29.3712 5.68506 28.9784 5.6855 28.5608L5.71119 5.31081C5.71213 4.45012 6.41231 3.75 7.27206 3.75H8.82813V4.0625C8.82813 4.92406 9.52906 5.625 10.3906 5.625H21.6406C22.5022 5.625 23.2031 4.92406 23.2031 4.0625V3.75H24.7536C25.1709 3.75 25.5631 3.91275 25.8579 4.20825C26.1528 4.50375 26.315 4.89656 26.3145 5.31419L26.2888 28.5642Z" fill="#686868"/><path d="M16.3188 12.5H22.9795C23.4973 12.5 23.917 12.0803 23.917 11.5625C23.917 11.0447 23.4973 10.625 22.9795 10.625H16.3188C15.8011 10.625 15.3813 11.0447 15.3813 11.5625C15.3813 12.0803 15.8011 12.5 16.3188 12.5Z" fill="#686868"/><path d="M16.3188 18.75H22.9795C23.4973 18.75 23.917 18.3303 23.917 17.8125C23.917 17.2947 23.4973 16.875 22.9795 16.875H16.3188C15.8011 16.875 15.3813 17.2947 15.3813 17.8125C15.3813 18.3303 15.8011 18.75 16.3188 18.75Z" fill="#686868"/><path d="M23.0063 23.125H16.3188C15.8011 23.125 15.3813 23.5447 15.3813 24.0625C15.3813 24.5803 15.8011 25 16.3188 25H23.0063C23.5241 25 23.9438 24.5803 23.9438 24.0625C23.9438 23.5447 23.5242 23.125 23.0063 23.125Z" fill="#686868"/><path d="M12.3283 9.00982L10.1663 11.1718L9.65656 10.662C9.29043 10.2959 8.69687 10.2959 8.33075 10.662C7.96462 11.0281 7.96462 11.6217 8.33075 11.9878L9.50343 13.1606C9.67925 13.3364 9.91768 13.4352 10.1664 13.4352C10.415 13.4352 10.6534 13.3364 10.8292 13.1606L13.6542 10.3357C14.0203 9.96963 14.0203 9.376 13.6542 9.00988C13.2881 8.64369 12.6945 8.64369 12.3283 9.00982Z" fill="#686868"/><path d="M12.3283 15.7372L10.1663 17.8992L9.65656 17.3894C9.29043 17.0233 8.69687 17.0233 8.33075 17.3894C7.96462 17.7555 7.96462 18.3491 8.33075 18.7152L9.50343 19.888C9.67925 20.0638 9.91768 20.1626 10.1664 20.1626C10.415 20.1626 10.6535 20.0639 10.8292 19.888L13.6542 17.0631C14.0203 16.697 14.0203 16.1034 13.6542 15.7372C13.2881 15.3711 12.6944 15.3711 12.3283 15.7372Z" fill="#686868"/><path d="M12.3283 21.9872L10.1663 24.1492L9.65656 23.6394C9.29043 23.2733 8.69687 23.2733 8.33075 23.6394C7.96462 24.0055 7.96462 24.5991 8.33075 24.9652L9.50343 26.138C9.67925 26.3138 9.91768 26.4126 10.1664 26.4126C10.415 26.4126 10.6535 26.3139 10.8292 26.138L13.6542 23.3131C14.0203 22.947 14.0203 22.3534 13.6542 21.9872C13.2881 21.6211 12.6944 21.6211 12.3283 21.9872Z" fill="#686868"/></svg>`,
    },
    {
      id: "scan-visitor",
      label: "Scan Visitor",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_273_2040)"><path d="M28.5413 0H24.0625C23.5447 0 23.125 0.41975 23.125 0.9375C23.125 1.45525 23.5447 1.875 24.0625 1.875H28.5413C29.4145 1.875 30.125 2.5855 30.125 3.45881V7.9375C30.125 8.45525 30.5448 8.875 31.0625 8.875C31.5802 8.875 32 8.45525 32 7.9375V3.45881C32 1.55163 30.4484 0 28.5413 0Z" fill="#686868"/><path d="M0.9375 8.875C1.45525 8.875 1.875 8.45525 1.875 7.9375V3.45881C1.875 2.5855 2.5855 1.875 3.45875 1.875H7.9375C8.45525 1.875 8.875 1.45525 8.875 0.9375C8.875 0.41975 8.45525 0 7.9375 0H3.45875C1.55163 0 0 1.55163 0 3.45881V7.9375C0 8.45525 0.41975 8.875 0.9375 8.875Z" fill="#686868"/><path d="M7.9375 30.125H3.45875C2.5855 30.125 1.875 29.4145 1.875 28.5412V24.0625C1.875 23.5447 1.45525 23.125 0.9375 23.125C0.41975 23.125 0 23.5447 0 24.0625V28.5412C0 30.4484 1.55163 32 3.45875 32H7.9375C8.45525 32 8.875 31.5802 8.875 31.0625C8.875 30.5448 8.45525 30.125 7.9375 30.125Z" fill="#686868"/><path d="M31.0625 23.125C30.5448 23.125 30.125 23.5447 30.125 24.0625V28.5412C30.125 29.4145 29.4145 30.125 28.5413 30.125H24.0625C23.5447 30.125 23.125 30.5448 23.125 31.0625C23.125 31.5802 23.5447 32 24.0625 32H28.5413C30.4484 32 32 30.4484 32 28.5412V24.0625C32 23.5447 31.5802 23.125 31.0625 23.125Z" fill="#686868"/><path d="M21.3525 6.875H24.326C24.732 6.875 25.0624 7.20531 25.0624 7.61137V10.5848C25.0624 11.1025 25.4821 11.5223 25.9999 11.5223C26.5176 11.5223 26.9374 11.1025 26.9374 10.5848V7.61137C26.9374 6.17144 25.7659 5 24.326 5H21.3525C20.8348 5 20.415 5.41975 20.415 5.9375C20.415 6.45525 20.8348 6.875 21.3525 6.875Z" fill="#686868"/><path d="M5.0625 7.61137V10.5848C5.0625 11.1025 5.48225 11.5223 6 11.5223C6.51775 11.5223 6.9375 11.1025 6.9375 10.5848V7.61137C6.9375 7.20531 7.26787 6.875 7.67387 6.875H10.6473C11.1651 6.875 11.5848 6.45525 11.5848 5.9375C11.5848 5.41975 11.1651 5 10.6473 5H7.67387C6.234 5 5.0625 6.17144 5.0625 7.61137Z" fill="#686868"/><path d="M10.6473 25H7.67387C7.26781 25 6.9375 24.6697 6.9375 24.2637V21.2903C6.9375 20.7725 6.51775 20.3528 6 20.3528C5.48225 20.3528 5.0625 20.7725 5.0625 21.2903V24.2637C5.0625 25.7036 6.234 26.875 7.67387 26.875H10.6473C11.1651 26.875 11.5848 26.4553 11.5848 25.9375C11.5848 25.4198 11.1651 25 10.6473 25Z" fill="#686868"/><path d="M26.9374 24.2637V21.2903C26.9374 20.7725 26.5176 20.3528 25.9999 20.3528C25.4821 20.3528 25.0624 20.7725 25.0624 21.2903V24.2637C25.0624 24.6697 24.732 25 24.326 25H21.3525C20.8348 25 20.415 25.4198 20.415 25.9375C20.415 26.4553 20.8348 26.875 21.3525 26.875H24.326C25.7659 26.875 26.9374 25.7036 26.9374 24.2637Z" fill="#686868"/><path d="M0.0625 16C0.0625 16.5178 0.48225 16.9375 1 16.9375H31C31.5177 16.9375 31.9375 16.5178 31.9375 16C31.9375 15.4822 31.5177 15.0625 31 15.0625H1C0.48225 15.0625 0.0625 15.4822 0.0625 16Z" fill="#686868"/></g><defs><clipPath id="clip0_273_2040"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "visitor-enquiry",
      label: "Visitor Enquiry",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_273_2051)"><path d="M32 21.6562C32 16.9919 28.8572 12.9167 24.4253 11.6887C24.1467 5.19629 18.7786 0 12.2188 0C5.4812 0 0 5.4812 0 12.2188C0 14.4146 0.584473 16.5525 1.69434 18.4294L0.0449219 24.3923L6.00806 22.7432C7.7334 23.7634 9.67969 24.3381 11.6885 24.4248C12.9163 28.8569 16.9917 32 21.6562 32C23.5181 32 25.3286 31.5042 26.9194 30.562L31.9548 31.9548L30.562 26.9194C31.5042 25.3286 32 23.5181 32 21.6562ZM6.30396 20.7158L2.73413 21.7034L3.72168 18.1335L3.49658 17.7815C2.43579 16.1218 1.875 14.1982 1.875 12.2188C1.875 6.51514 6.51514 1.875 12.2188 1.875C17.9224 1.875 22.5625 6.51514 22.5625 12.2188C22.5625 17.9224 17.9224 22.5625 12.2188 22.5625C10.2393 22.5625 8.31592 22.0017 6.65601 20.9409L6.30396 20.7158ZM29.2659 29.2659L26.6169 28.533L26.2632 28.7632C24.8918 29.6541 23.2986 30.125 21.6562 30.125C17.9902 30.125 14.7688 27.7546 13.6274 24.3557C19.2412 23.7085 23.7085 19.2412 24.356 13.6272C27.7546 14.7688 30.125 17.9902 30.125 21.6562C30.125 23.2986 29.6541 24.8918 28.7632 26.2632L28.533 26.6169L29.2659 29.2659Z" fill="#686868"/><path d="M11.2812 16.9375H13.1562V18.8125H11.2812V16.9375Z" fill="#686868"/><path d="M14.0938 9.375C14.0938 9.90747 13.877 10.3989 13.4834 10.759L11.2812 12.7747V15.0625H13.1562V13.6003L14.7493 12.1423C15.5242 11.4331 15.9688 10.4246 15.9688 9.375C15.9688 7.30713 14.2866 5.625 12.2188 5.625C10.1509 5.625 8.46875 7.30713 8.46875 9.375H10.3438C10.3438 8.34106 11.1848 7.5 12.2188 7.5C13.2527 7.5 14.0938 8.34106 14.0938 9.375Z" fill="#686868"/></g><defs><clipPath id="clip0_273_2051"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "dialogues",
      label: "Dialogues",
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35.2986 11.0132C35.7195 10.8636 36.0005 10.465 36 10.0182C35.9994 9.57148 35.7175 9.17358 35.2962 9.02494L18.3509 3.0462C18.1239 2.96604 17.8762 2.96604 17.6491 3.0462L0.703829 9.02494C0.282517 9.17351 0.000563343 9.57148 8.42838e-07 10.0182C-0.000561657 10.465 0.280477 10.8636 0.701438 11.0132L7.4141 13.3996V20.2795C7.4141 21.415 8.59866 22.3752 10.9349 23.1335C12.9712 23.7944 15.4804 24.1584 18.0001 24.1584C20.5198 24.1584 23.0289 23.7944 25.0653 23.1335C27.4015 22.3752 28.586 21.4151 28.586 20.2795V13.3996L31.3575 12.4144V21.9476C30.125 22.3834 29.2394 23.5597 29.2394 24.9395C29.2394 26.3194 30.125 27.4957 31.3575 27.9315V31.9593C31.3575 32.5418 31.8298 33.014 32.4122 33.014C32.9947 33.014 33.4669 32.5418 33.4669 31.9593V27.9315C34.6994 27.4957 35.5851 26.3194 35.5851 24.9395C35.5851 23.5597 34.6994 22.3834 33.4669 21.9476V11.6644L35.2986 11.0132ZM32.4122 26.003C31.8258 26.003 31.3487 25.5259 31.3487 24.9395C31.3487 24.3531 31.8258 23.876 32.4122 23.876C32.9986 23.876 33.4756 24.3531 33.4756 24.9395C33.4756 25.5259 32.9986 26.003 32.4122 26.003ZM18 5.15916L31.7861 10.0233L18 14.9243L4.2139 10.0232L18 5.15916ZM26.4766 20.1205C26.2744 20.3243 25.5508 20.8123 23.9175 21.2783C22.1751 21.7753 20.0735 22.0491 18 22.0491C15.9265 22.0491 13.825 21.7753 12.0825 21.2783C10.4492 20.8123 9.72556 20.3244 9.52341 20.1205V14.1495L17.6467 17.0374C17.7609 17.078 17.8805 17.0984 17.9999 17.0984C18.1195 17.0984 18.2389 17.078 18.3532 17.0374L26.4765 14.1495V20.1205H26.4766Z" fill="#686868"/></svg>`,
    },
    {
      id: "participants",
      label: "Participants",
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_273_2126)"><path d="M35.963 23.3473C35.3686 19.9998 33.1472 17.312 30.218 16.0653C31.5179 14.9752 32.3482 13.3245 32.3482 11.4804C32.3482 8.20514 29.7302 5.54041 26.512 5.54041C23.2938 5.54041 20.6758 8.20487 20.6758 11.4804C20.6758 13.3256 21.5069 14.9768 22.8082 16.0672C22.3226 16.2743 21.8521 16.5215 21.4028 16.8096C20.2704 17.5358 19.3036 18.4922 18.5584 19.6122C17.8001 19.1085 16.9846 18.6894 16.125 18.3678C17.9726 17.0321 19.1805 14.8359 19.1805 12.3577C19.1805 8.29633 15.9365 4.99219 11.9491 4.99219C7.96157 4.99219 4.71758 8.29633 4.71758 12.3577C4.71758 14.8359 5.92553 17.0321 7.77316 18.3678C3.84115 19.8388 0.825401 23.3372 0.0431742 27.7416C-0.101296 28.5559 0.120628 29.3865 0.651542 30.0204C1.17751 30.648 1.94491 31.0078 2.75707 31.0078H21.141C21.9532 31.0078 22.7206 30.648 23.2466 30.0204C23.7778 29.3865 23.9994 28.5559 23.8549 27.7416C23.7585 27.1983 23.6278 26.669 23.466 26.1557H33.6273C34.3266 26.1557 34.9874 25.8459 35.44 25.3059C35.8965 24.7613 36.0871 24.0472 35.963 23.3473ZM22.7852 11.4804C22.7852 9.36804 24.457 7.64978 26.512 7.64978C28.567 7.64978 30.2388 9.36804 30.2388 11.4804C30.2388 13.5926 28.567 15.3108 26.512 15.3108C24.457 15.3108 22.7852 13.5926 22.7852 11.4804ZM6.82696 12.3577C6.82696 9.4595 9.12475 7.10156 11.9491 7.10156C14.7734 7.10156 17.0714 9.4595 17.0714 12.3577C17.0714 15.2559 14.7734 17.6138 11.9491 17.6138C9.12475 17.6138 6.82696 15.2559 6.82696 12.3577ZM21.6299 28.6655C21.5569 28.7526 21.3965 28.8984 21.141 28.8984H2.75707C2.50164 28.8984 2.34124 28.7526 2.26818 28.6655C2.19238 28.5749 2.07207 28.3821 2.12014 28.1102C2.98312 23.2506 7.11672 19.7232 11.9491 19.7232C16.7814 19.7232 20.9153 23.2506 21.778 28.1102C21.8263 28.3821 21.706 28.5749 21.6299 28.6655ZM33.8234 23.951C33.7935 23.9867 33.7284 24.0463 33.6276 24.0463H22.5794C21.9554 22.8771 21.154 21.8282 20.2138 20.9334C21.5876 18.7479 23.9357 17.4202 26.512 17.4202C30.1372 17.4202 33.2381 20.0679 33.886 23.7162C33.9063 23.8313 33.8555 23.9128 33.8234 23.951Z" fill="#686868"/></g><defs><clipPath id="clip0_273_2126"><rect width="36" height="36" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "delegate-registration",
      label: "Delegate Registration",
      icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_273_2128)"><path d="M21.5373 15.0533C20.9608 14.7792 20.3726 14.5431 19.774 14.3454C21.7125 12.8904 22.9687 10.5735 22.9687 7.96875C22.9687 3.5748 19.394 0 15 0C10.606 0 7.03123 3.5748 7.03123 7.96875C7.03123 10.5764 8.29029 12.8955 10.2324 14.3503C8.453 14.9361 6.78338 15.8476 5.32205 17.0496C2.64244 19.2537 0.779333 22.3281 0.0760321 25.7064C-0.144398 26.765 0.119684 27.8522 0.800427 28.6893C1.47783 29.5223 2.4823 30 3.55621 30H17.9883C18.6355 30 19.1601 29.4754 19.1601 28.8281C19.1601 28.1809 18.6355 27.6562 17.9883 27.6562H3.55621C3.05593 27.6562 2.75412 27.377 2.61877 27.2106C2.38504 26.9232 2.29457 26.5491 2.37056 26.1841C3.58668 20.3426 8.73918 16.0754 14.6893 15.9315C14.7924 15.9355 14.8959 15.9375 15 15.9375C15.105 15.9375 15.2096 15.9354 15.3137 15.9314C17.1371 15.9742 18.8908 16.3903 20.5311 17.1701C21.1157 17.4478 21.8147 17.1993 22.0926 16.6147C22.3704 16.0302 22.1219 15.3311 21.5373 15.0533ZM15.2858 13.5865C15.1907 13.5848 15.0954 13.584 15 13.584C14.9054 13.584 14.8108 13.5849 14.7164 13.5867C11.746 13.4385 9.37498 10.9753 9.37498 7.96875C9.37498 4.86709 11.8983 2.34375 15 2.34375C18.1016 2.34375 20.625 4.86709 20.625 7.96875C20.625 10.9746 18.2552 13.4372 15.2858 13.5865Z" fill="#686868"/><path d="M28.8281 23.2617H25.6055V20.0391C25.6055 19.3918 25.0808 18.8672 24.4336 18.8672C23.7864 18.8672 23.2617 19.3918 23.2617 20.0391V23.2617H20.0391C19.3918 23.2617 18.8672 23.7864 18.8672 24.4336C18.8672 25.0808 19.3918 25.6055 20.0391 25.6055H23.2617V28.8281C23.2617 29.4754 23.7864 30 24.4336 30C25.0808 30 25.6055 29.4754 25.6055 28.8281V25.6055H28.8281C29.4754 25.6055 30 25.0808 30 24.4336C30 23.7864 29.4754 23.2617 28.8281 23.2617Z" fill="#686868"/></g><defs><clipPath id="clip0_273_2128"><rect width="30" height="30" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "faqs",
      label: "FAQs",
      icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_273_2095)"><path d="M32 21.6562C32 16.9919 28.8572 12.9167 24.4253 11.6887C24.1467 5.19629 18.7786 0 12.2188 0C5.4812 0 0 5.4812 0 12.2188C0 14.4146 0.584473 16.5525 1.69434 18.4294L0.0449219 24.3923L6.00806 22.7432C7.7334 23.7634 9.67969 24.3381 11.6885 24.4248C12.9163 28.8569 16.9917 32 21.6562 32C23.5181 32 25.3286 31.5042 26.9194 30.562L31.9548 31.9548L30.562 26.9194C31.5042 25.3286 32 23.5181 32 21.6562ZM6.30396 20.7158L2.73413 21.7034L3.72168 18.1335L3.49658 17.7815C2.43579 16.1218 1.875 14.1982 1.875 12.2188C1.875 6.51514 6.51514 1.875 12.2188 1.875C17.9224 1.875 22.5625 6.51514 22.5625 12.2188C22.5625 17.9224 17.9224 22.5625 12.2188 22.5625C10.2393 22.5625 8.31592 22.0017 6.65601 20.9409L6.30396 20.7158ZM29.2659 29.2659L26.6169 28.533L26.2632 28.7632C24.8918 29.6541 23.2986 30.125 21.6562 30.125C17.9902 30.125 14.7688 27.7546 13.6274 24.3557C19.2412 23.7085 23.7085 19.2412 24.356 13.6272C27.7546 14.7688 30.125 17.9902 30.125 21.6562C30.125 23.2986 29.6541 24.8918 28.7632 26.2632L28.533 26.6169L29.2659 29.2659Z" fill="#686868"/><path d="M11.2812 16.9375H13.1562V18.8125H11.2812V16.9375Z" fill="#686868"/><path d="M14.0938 9.375C14.0938 9.90747 13.877 10.3989 13.4834 10.759L11.2812 12.7747V15.0625H13.1562V13.6003L14.7493 12.1423C15.5242 11.4331 15.9688 10.4246 15.9688 9.375C15.9688 7.30713 14.2866 5.625 12.2188 5.625C10.1509 5.625 8.46875 7.30713 8.46875 9.375H10.3438C10.3438 8.34106 11.1848 7.5 12.2188 7.5C13.2527 7.5 14.0938 8.34106 14.0938 9.375Z" fill="#686868"/></g><defs><clipPath id="clip0_273_2095"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>`,
    },
    {
      id: "info-details",
      label: "Info Details View",
      icon: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.2905 6.56606C30.2905 2.9455 27.3455 0 23.7257 0C22.2273 0 20.8447 0.504625 19.7386 1.35287H3.98404C2.72985 1.35287 1.70947 2.37319 1.70947 3.62744V26.3633C1.70947 27.6174 2.72985 28.6379 3.98404 28.6379H5.96722V29.7254C5.96722 30.9796 6.9876 32 8.24179 32H24.5831C25.8373 32 26.8577 30.9796 26.8577 29.7254V21.0565C26.8577 20.7114 26.5778 20.4315 26.2327 20.4315C25.8875 20.4315 25.6077 20.7114 25.6077 21.0565V29.7254C25.6077 30.2903 25.148 30.75 24.5831 30.75H8.24179C7.67685 30.75 7.21722 30.2904 7.21722 29.7254V28.6379H20.3254C21.5796 28.6379 22.6 27.6175 22.6 26.3633V13.0355C22.9659 13.099 23.342 13.1321 23.7257 13.1321C24.3795 13.1321 25.0113 13.036 25.6077 12.8572V15.4058C25.6077 15.7509 25.8876 16.0308 26.2327 16.0308C26.5778 16.0308 26.8577 15.7509 26.8577 15.4058V12.3355C28.901 11.2214 30.2905 9.053 30.2905 6.56606Z" fill="#686868"/></svg>`,
    },
  ];

  menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: DASHBOARD_ICON,
      route: "/event/dashboard",
      action: () => this.navigateTo("dashboard"),
    },
    {
      label: "Event Setup",
      icon: EVENT_SETUP_ICON,
      route: "/event/setup",
      action: () => this.navigateTo("setup"),
    },
    {
      label: "Event Overview",
      icon: EVENT_OVERVIEW_ICON,
      route: "/event/overview",
      action: () => this.navigateTo("overview"),
    },
    {
      label: "Send Notification",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/notification",
      action: () => this.navigateTo("notification"),
    },
    {
      label: "User Profile",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/profile",
      action: () => this.navigateTo("profile"),
    },
    {
      label: "Event Analytics",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/analytics",
      action: () => this.navigateTo("analytics"),
    },
    {
      label: "Event Theme",
      icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`,
      route: "/event/theme",
      action: () => this.navigateTo("theme"),
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private scheduleService: ScheduleService,
    private exhibitorService: ExhibitorService,
    private speakerService: SpeakerService,
    private informationService: InformationService,
    private sponsorService: SponsorService,
    private socialMediaService: SocialMediaService,
    private imageGalleryService: ImageGalleryService,
  ) {}

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get("id") || "";

    this.route.queryParams.subscribe((params) => {
      if (params["eventName"]) {
        this.eventName = params["eventName"];
      }
    });

    this.loadActiveFeatures();
    this.loadSchedules();
    this.loadExhibitors();
    this.loadSpeakers();
    this.loadInformation();
    this.loadSponsors();
    this.loadSocialMedia();
    this.loadGalleryImages();

    this.updateActiveRoute();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveRoute();
      });
  }

  updateActiveRoute() {
    const url = this.router.url;
    if (url.includes("/dashboard")) {
      this.activeRoute = "/event/dashboard";
    } else if (url.includes("/setup")) {
      this.activeRoute = "/event/setup";
    } else if (url.includes("/overview")) {
      this.activeRoute = "/event/overview";
    } else if (url.includes("/notification")) {
      this.activeRoute = "/event/notification";
    } else if (url.includes("/profile")) {
      this.activeRoute = "/event/profile";
    } else if (url.includes("/analytics")) {
      this.activeRoute = "/event/analytics";
    } else if (url.includes("/theme")) {
      this.activeRoute = "/event/theme";
    }
  }

  navigateTo(page: string) {
    const eventId = this.route.snapshot.paramMap.get("id");
    switch (page) {
      case "dashboard":
        this.activeRoute = "/event/dashboard";
        this.router.navigate([`/event/${eventId}/dashboard`]);
        break;
      case "overview":
        this.activeRoute = "/event/overview";
        this.router.navigate([`/event/${eventId}/overview`]);
        break;
      case "setup":
        this.activeRoute = "/event/setup";
        break;
      case "notification":
        this.activeRoute = "/event/notification";
        break;
      case "profile":
        this.activeRoute = "/event/profile";
        break;
      case "analytics":
        this.activeRoute = "/event/analytics";
        break;
      case "theme":
        this.activeRoute = "/event/theme";
        break;
    }
  }

  onBackToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.logo = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.banner = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.bannerPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onNext() {
    if (this.currentTab === "details") {
      this.currentTab = "features";
    } else if (this.currentTab === "features") {
      this.currentTab = "content";
      this.selectedFeatureIndex = 0;
    } else if (this.currentTab === "content") {
      if (this.selectedFeatureIndex < this.activeFeatures.length - 1) {
        this.selectedFeatureIndex++;
      }
    } else {
      console.log("Form submitted:", this.formData);
    }
  }

  onBack() {
    if (this.currentTab === "features") {
      this.currentTab = "details";
    } else if (this.currentTab === "content") {
      if (this.selectedFeatureIndex > 0) {
        this.selectedFeatureIndex--;
      } else {
        this.currentTab = "features";
      }
    }
  }

  toggleFeature(featureId: string) {
    const index = this.activeFeatures.indexOf(featureId);
    if (index > -1) {
      this.activeFeatures.splice(index, 1);
    } else {
      this.activeFeatures.push(featureId);
    }
    this.saveActiveFeatures();
  }

  isFeatureActive(featureId: string): boolean {
    return this.activeFeatures.includes(featureId);
  }

  loadActiveFeatures() {
    const saved = localStorage.getItem(`activeFeatures_${this.eventId}`);
    if (saved) {
      try {
        this.activeFeatures = JSON.parse(saved);
      } catch {
        this.activeFeatures = [
          "schedule",
          "exhibitor",
          "about",
          "information",
          "speakers",
          "sponsors",
          "social-media",
        ];
      }
    }
  }

  saveActiveFeatures() {
    localStorage.setItem(
      `activeFeatures_${this.eventId}`,
      JSON.stringify(this.activeFeatures),
    );
  }

  getFeatureLabel(featureId: string): string {
    if (featureId === "schedule") {
      return "Schedule";
    }
    if (featureId === "exhibitor") {
      return "Exhibitor";
    }
    const feature = this.inactiveFeatures.find((f) => f.id === featureId);
    return feature ? feature.label : "";
  }

  getFeatureIcon(featureId: string): SafeHtml {
    if (featureId === "schedule") {
      return this
        .getSafeHtml(`<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.25 2.5H26.75V0H24.25V2.5H7.75V0H5.25V2.5H3.75C1.68225 2.5 0 4.18225 0 6.25V28.25C0 30.3177 1.68225 32 3.75 32H28.25C30.3177 32 32 30.3177 32 28.25V6.25C32 4.18225 30.3177 2.5 28.25 2.5ZM29.5 28.25C29.5 28.9393 28.9393 29.5 28.25 29.5H3.75C3.06075 29.5 2.5 28.9393 2.5 28.25V11.75H29.5V28.25ZM29.5 9.25H2.5V6.25C2.5 5.56075 3.06075 5 3.75 5H5.25V7.5H7.75V5H24.25V7.5H26.75V5H28.25C28.9393 5 29.5 5.56075 29.5 6.25V9.25Z" fill="#049AD0"/>
        <path d="M7.25 14.375H4.75V16.875H7.25V14.375Z" fill="#049AD0"/>
        <path d="M12.25 14.375H9.75V16.875H12.25V14.375Z" fill="#049AD0"/>
        <path d="M17.25 14.375H14.75V16.875H17.25V14.375Z" fill="#049AD0"/>
        <path d="M22.25 14.375H19.75V16.875H22.25V14.375Z" fill="#049AD0"/>
        <path d="M27.25 14.375H24.75V16.875H27.25V14.375Z" fill="#049AD0"/>
        <path d="M7.25 19.375H4.75V21.875H7.25V19.375Z" fill="#049AD0"/>
        <path d="M12.25 19.375H9.75V21.875H12.25V19.375Z" fill="#049AD0"/>
        <path d="M17.25 19.375H14.75V21.875H17.25V19.375Z" fill="#049AD0"/>
        <path d="M22.25 19.375H19.75V21.875H22.25V19.375Z" fill="#049AD0"/>
        <path d="M7.25 24.375H4.75V26.875H7.25V24.375Z" fill="#049AD0"/>
        <path d="M12.25 24.375H9.75V26.875H12.25V24.375Z" fill="#049AD0"/>
        <path d="M17.25 24.375H14.75V26.875H17.25V24.375Z" fill="#049AD0"/>
        <path d="M22.25 24.375H19.75V26.875H22.25V24.375Z" fill="#049AD0"/>
        <path d="M27.25 19.375H24.75V21.875H27.25V19.375Z" fill="#049AD0"/>
      </svg>`);
    }
    const feature = this.inactiveFeatures.find((f) => f.id === featureId);
    if (feature) {
      const iconWithBlueColor = feature.icon.replace(/#686868/g, "#049AD0");
      return this.getSafeHtml(iconWithBlueColor);
    }
    return this.getSafeHtml("");
  }

  getFeatureTabIcon(featureId: string, index: number): SafeHtml {
    const isActive = index === this.selectedFeatureIndex;
    const color = isActive ? "#FFFFFF" : "#686868";

    if (featureId === "schedule") {
      return this
        .getSafeHtml(`<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1494_18783)">
          <path d="M19.4219 1.71875H18.3906V0H16.6719V1.71875H5.32812V0H3.60938V1.71875H2.57812C1.15655 1.71875 0 2.8753 0 4.29688V19.4219C0 20.8435 1.15655 22 2.57812 22H19.4219C20.8435 22 22 20.8435 22 19.4219V4.29688C22 2.8753 20.8435 1.71875 19.4219 1.71875ZM20.2812 19.4219C20.2812 19.8957 19.8957 20.2812 19.4219 20.2812H2.57812C2.10427 20.2812 1.71875 19.8957 1.71875 19.4219V8.07812H20.2812V19.4219ZM20.2812 6.35938H1.71875V4.29688C1.71875 3.82302 2.10427 3.4375 2.57812 3.4375H3.60938V5.15625H5.32812V3.4375H16.6719V5.15625H18.3906V3.4375H19.4219C19.8957 3.4375 20.2812 3.82302 20.2812 4.29688V6.35938Z" fill="${color}"/>
          <path d="M4.98438 9.88281H3.26562V11.6016H4.98438V9.88281Z" fill="${color}"/>
          <path d="M8.42188 9.88281H6.70312V11.6016H8.42188V9.88281Z" fill="${color}"/>
          <path d="M11.8594 9.88281H10.1406V11.6016H11.8594V9.88281Z" fill="${color}"/>
          <path d="M15.2969 9.88281H13.5781V11.6016H15.2969V9.88281Z" fill="${color}"/>
          <path d="M18.7344 9.88281H17.0156V11.6016H18.7344V9.88281Z" fill="${color}"/>
          <path d="M4.98438 13.3203H3.26562V15.0391H4.98438V13.3203Z" fill="${color}"/>
          <path d="M8.42188 13.3203H6.70312V15.0391H8.42188V13.3203Z" fill="${color}"/>
          <path d="M11.8594 13.3203H10.1406V15.0391H11.8594V13.3203Z" fill="${color}"/>
          <path d="M15.2969 13.3203H13.5781V15.0391H15.2969V13.3203Z" fill="${color}"/>
          <path d="M4.98438 16.7578H3.26562V18.4766H4.98438V16.7578Z" fill="${color}"/>
          <path d="M8.42188 16.7578H6.70312V18.4766H8.42188V16.7578Z" fill="${color}"/>
          <path d="M11.8594 16.7578H10.1406V18.4766H11.8594V16.7578Z" fill="${color}"/>
          <path d="M15.2969 16.7578H13.5781V18.4766H15.2969V16.7578Z" fill="${color}"/>
          <path d="M18.7344 13.3203H17.0156V15.0391H18.7344V13.3203Z" fill="${color}"/>
        </g>
        <defs>
          <clipPath id="clip0_1494_18783">
            <rect width="22" height="22" fill="white"/>
          </clipPath>
        </defs>
      </svg>`);
    }

    const feature = this.inactiveFeatures.find((f) => f.id === featureId);
    if (feature) {
      const iconWithColor = feature.icon.replace(/#686868/g, color);
      return this.getSafeHtml(iconWithColor);
    }
    return this.getSafeHtml("");
  }

  onDragStartFeature(event: DragEvent, featureId: string) {
    this.draggedFeatureId = featureId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("featureId", featureId);
    }
  }

  onDragEndFeature(event: DragEvent) {
    this.draggedFeatureId = null;
  }

  onDragOverSelected(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
    this.isDragOverSelected = true;
  }

  onDragLeaveSelected(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    if (
      event.relatedTarget === null ||
      !target.contains(event.relatedTarget as Node)
    ) {
      this.isDragOverSelected = false;
    }
  }

  onDropSelected(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOverSelected = false;

    if (event.dataTransfer) {
      const featureId = event.dataTransfer.getData("featureId");
      if (featureId && !this.activeFeatures.includes(featureId)) {
        this.activeFeatures.push(featureId);
        this.saveActiveFeatures();
      }
    }
  }

  onDragStart(event: DragEvent, featureId: string) {
    this.draggedFeatureId = featureId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("featureId", featureId);
    }
  }

  onDragEnd(event: DragEvent) {
    this.draggedFeatureId = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  onDragLeave(event: DragEvent) {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  openScheduleModal() {
    this.editMode = false;
    this.editingSchedule = null;
    this.isScheduleModalOpen = true;
  }

  closeScheduleModal() {
    this.isScheduleModalOpen = false;
    this.editMode = false;
    this.editingSchedule = null;
  }

  onScheduleSave(scheduleData: any) {
    if (this.editMode && this.editingSchedule) {
      this.scheduleService.updateSchedule(
        this.editingSchedule.id,
        scheduleData,
      );
    } else {
      this.scheduleService.addSchedule(this.eventId, scheduleData);
    }
    this.loadSchedules();
    this.closeScheduleModal();
  }

  loadSchedules() {
    this.schedules = this.scheduleService.getSchedulesByEvent(this.eventId);
  }

  editSchedule(schedule: Schedule) {
    this.editMode = true;
    this.editingSchedule = schedule;
    this.isScheduleModalOpen = true;
  }

  deleteSchedule(id: string) {
    this.scheduleToDelete = id;
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    if (this.scheduleToDelete) {
      this.scheduleService.deleteSchedule(this.scheduleToDelete);
      this.loadSchedules();
    } else if (this.exhibitorToDelete) {
      this.exhibitorService.deleteExhibitor(this.exhibitorToDelete);
      this.loadExhibitors();
    } else if (this.speakerToDelete) {
      this.speakerService.deleteSpeaker(this.speakerToDelete);
      this.loadSpeakers();
    } else if (this.informationToDelete) {
      this.informationService.deleteInformation(this.informationToDelete);
      this.loadInformation();
    } else if (this.sponsorToDelete) {
      this.sponsorService.deleteSponsor(this.sponsorToDelete);
      this.loadSponsors();
    } else if (this.socialMediaToDelete) {
      this.socialMediaService.deleteSocialMedia(this.socialMediaToDelete);
      this.loadSocialMedia();
    } else if (this.galleryImageToDelete) {
      this.imageGalleryService.deleteGalleryImage(this.galleryImageToDelete);
      this.loadGalleryImages();
    }
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.scheduleToDelete = null;
    this.exhibitorToDelete = null;
    this.speakerToDelete = null;
    this.informationToDelete = null;
    this.sponsorToDelete = null;
    this.socialMediaToDelete = null;
    this.galleryImageToDelete = null;
  }

  openExhibitorModal() {
    this.editModeExhibitor = false;
    this.editingExhibitor = null;
    this.isExhibitorModalOpen = true;
  }

  closeExhibitorModal() {
    this.isExhibitorModalOpen = false;
    this.editModeExhibitor = false;
    this.editingExhibitor = null;
  }

  onExhibitorSave(exhibitorData: any) {
    if (this.editModeExhibitor && this.editingExhibitor) {
      this.exhibitorService.updateExhibitor(
        this.editingExhibitor.id,
        exhibitorData,
      );
    } else {
      this.exhibitorService.addExhibitor(this.eventId, exhibitorData);
    }
    this.loadExhibitors();
    this.closeExhibitorModal();
  }

  onAboutSave(aboutData: any) {
    if (aboutData && aboutData.title && aboutData.description) {
      this.aboutTitle = aboutData.title;
      this.aboutDescription = aboutData.description;
      this.editAboutContent = false;
    }
  }

  openAddSpeakersModal() {
    this.editModeSpeaker = false;
    this.editingSpeaker = null;
    this.isAddSpeakersModalOpen = true;
  }

  closeAddSpeakersModal() {
    this.isAddSpeakersModalOpen = false;
    this.editModeSpeaker = false;
    this.editingSpeaker = null;
  }

  onSpeakerSave(speakerData: any) {
    if (this.editModeSpeaker && this.editingSpeaker) {
      this.speakerService.updateSpeaker(this.editingSpeaker.id, speakerData);
    } else {
      this.speakerService.addSpeaker(this.eventId, speakerData);
    }
    this.loadSpeakers();
    this.closeAddSpeakersModal();
  }

  loadSpeakers() {
    this.speakers = this.speakerService.getSpeakersByEvent(this.eventId);
  }

  editSpeaker(speaker: Speaker) {
    this.editModeSpeaker = true;
    this.editingSpeaker = speaker;
    this.isAddSpeakersModalOpen = true;
  }

  deleteSpeaker(id: string) {
    this.speakerToDelete = id;
    this.isDeleteModalOpen = true;
  }

  loadExhibitors() {
    this.exhibitors = this.exhibitorService.getExhibitorsByEvent(this.eventId);
  }

  editExhibitor(exhibitor: Exhibitor) {
    this.editModeExhibitor = true;
    this.editingExhibitor = exhibitor;
    this.isExhibitorModalOpen = true;
  }

  deleteExhibitor(id: string) {
    this.exhibitorToDelete = id;
    this.isDeleteModalOpen = true;
  }

  getFilteredExhibitors(): Exhibitor[] {
    if (!this.searchQuery.trim()) {
      return this.exhibitors;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.exhibitors.filter(
      (exhibitor) =>
        exhibitor.companyName.toLowerCase().includes(query) ||
        exhibitor.hallNo.toLowerCase().includes(query) ||
        exhibitor.stallNo.toLowerCase().includes(query) ||
        exhibitor.registrationCode.toLowerCase().includes(query),
    );
  }

  formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  openSponsorsModal() {
    this.editModeSponsor = false;
    this.editingSponsor = null;
    this.isSponsorsModalOpen = true;
  }

  closeSponsorsModal() {
    this.isSponsorsModalOpen = false;
    this.editModeSponsor = false;
    this.editingSponsor = null;
  }

  onSponsorSave(sponsorData: any) {
    if (this.editModeSponsor && this.editingSponsor) {
      this.sponsorService.updateSponsor(this.editingSponsor.id, sponsorData);
    } else {
      this.sponsorService.addSponsor(this.eventId, sponsorData);
    }
    this.loadSponsors();
    this.closeSponsorsModal();
  }

  loadSponsors() {
    this.sponsors = this.sponsorService.getSponsorsByEvent(this.eventId);
  }

  editSponsor(sponsor: Sponsor) {
    this.editModeSponsor = true;
    this.editingSponsor = sponsor;
    this.isSponsorsModalOpen = true;
  }

  deleteSponsor(id: string) {
    this.sponsorToDelete = id;
    this.isDeleteModalOpen = true;
  }

  openAddSocialMediaModal() {
    this.editModeSocialMedia = false;
    this.editingSocialMedia = null;
    this.isSocialMediaModalOpen = true;
  }

  editSocialMedia(socialMedia: SocialMediaEntry) {
    this.editModeSocialMedia = true;
    this.editingSocialMedia = socialMedia;
    this.isSocialMediaModalOpen = true;
  }

  closeSocialMediaModal() {
    this.isSocialMediaModalOpen = false;
    this.editModeSocialMedia = false;
    this.editingSocialMedia = null;
  }

  onSocialMediaSave(socialMediaData: any) {
    if (this.editModeSocialMedia && this.editingSocialMedia) {
      this.socialMediaService.updateSocialMedia(this.editingSocialMedia.id, {
        type: socialMediaData.socialMedia.facebook
          ? "Facebook"
          : socialMediaData.socialMedia.blogRss
            ? "Blog/Rss"
            : "Twitter",
        url:
          socialMediaData.urls.facebook ||
          socialMediaData.urls.blogRss ||
          socialMediaData.urls.twitter ||
          "",
      });
    } else {
      this.socialMediaService.addSocialMedia(this.eventId, socialMediaData);
    }
    this.loadSocialMedia();
    this.closeSocialMediaModal();
  }

  loadSocialMedia() {
    this.socialMediaList = this.socialMediaService.getSocialMediaByEvent(
      this.eventId,
    );
  }

  loadGalleryImages() {
    this.galleryImages = this.imageGalleryService.getGalleryImagesByEvent(
      this.eventId,
    );
  }

  openImageGalleryModal() {
    this.editingGalleryImage = null;
    this.isImageGalleryModalOpen = true;
  }

  closeImageGalleryModal() {
    this.isImageGalleryModalOpen = false;
    this.editingGalleryImage = null;
  }

  onImageGallerySave(
    imageData: Omit<GalleryImage, "id" | "eventId" | "createdAt">,
  ) {
    if (this.editingGalleryImage) {
      this.imageGalleryService.updateGalleryImage(
        this.editingGalleryImage.id,
        imageData,
      );
    } else {
      this.imageGalleryService.addGalleryImage(this.eventId, imageData);
    }
    this.loadGalleryImages();
    this.closeImageGalleryModal();
  }

  editGalleryImage(image: GalleryImage) {
    this.editingGalleryImage = image;
    this.isImageGalleryModalOpen = true;
  }

  deleteGalleryImage(id: string) {
    this.galleryImageToDelete = id;
    this.isDeleteModalOpen = true;
  }

  deleteSocialMedia(id: string) {
    this.socialMediaToDelete = id;
    this.isDeleteModalOpen = true;
  }

  formatTime(timeString: string): string {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  }

  openInformationModal() {
    this.editModeInformation = false;
    this.editingInformation = null;
    this.isInformationModalOpen = true;
  }

  closeInformationModal() {
    this.isInformationModalOpen = false;
    this.editModeInformation = false;
    this.editingInformation = null;
  }

  onInformationSave(informationData: any) {
    if (this.editModeInformation && this.editingInformation) {
      this.informationService.updateInformation(
        this.editingInformation.id,
        informationData,
      );
    } else {
      this.informationService.addInformation(this.eventId, informationData);
    }
    this.loadInformation();
    this.closeInformationModal();
  }

  loadInformation() {
    this.information = this.informationService.getInformationByEvent(
      this.eventId,
    );
  }

  editInformation(info: Information) {
    this.editModeInformation = true;
    this.editingInformation = info;
    this.isInformationModalOpen = true;
  }

  deleteInformation(id: string) {
    this.informationToDelete = id;
    this.isDeleteModalOpen = true;
  }

  getInitials(name: string): string {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}
