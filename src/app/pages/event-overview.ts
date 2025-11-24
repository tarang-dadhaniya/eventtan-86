import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import {
  EventDetailSidebarComponent,
  MenuItem,
} from "../components/event-detail-sidebar";
import { AddScheduleModalComponent } from "../components/add-schedule-modal";
import { ConfirmDeleteModalComponent } from "../components/confirm-delete-modal";
import { ScheduleService, Schedule } from "../services/schedule.service";

const DASHBOARD_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M9.11972 1.77151C8.15614 1.4095 7.09392 1.4095 6.13033 1.77151C5.5251 1.99889 4.94006 2.45532 3.51022 3.59919L1.21855 5.43253C0.895102 5.69128 0.423133 5.63884 0.164376 5.3154C-0.0943811 4.99195 -0.0419401 4.51998 0.281506 4.26122L2.57317 2.42789C2.61283 2.39616 2.65202 2.36481 2.69075 2.33381C3.96492 1.31414 4.74565 0.689359 5.6028 0.367335C6.90647 -0.122445 8.34359 -0.122445 9.64726 0.367335C10.5044 0.689359 11.2851 1.31414 12.5593 2.33381C12.598 2.3648 12.6372 2.39616 12.6769 2.42789L14.9685 4.26122C15.292 4.51998 15.3444 4.99195 15.0857 5.3154C14.8269 5.63884 14.355 5.69128 14.0315 5.43253L11.7398 3.59919C10.31 2.45532 9.72496 1.99889 9.11972 1.77151Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.08565 0.281506C4.34441 0.604953 4.29197 1.07692 3.96852 1.33568L3.51019 1.70235C3.09253 2.03647 2.92421 2.17224 2.77968 2.31347C2.06537 3.01148 1.61969 3.93876 1.52086 4.93259C1.50087 5.13368 1.5 5.34993 1.5 5.88479V11.2C1.5 13.3171 3.21624 15.0334 5.33334 15.0334C5.93164 15.0334 6.41667 14.5483 6.41667 13.95V10.2833C6.41667 8.35031 7.98367 6.78331 9.91667 6.78331C11.8497 6.78331 13.4167 8.35031 13.4167 10.2833V13.95C13.4167 14.5483 13.9017 15.0334 14.5 15.0334C16.6171 15.0334 18.3333 13.3171 18.3333 11.2V5.88479C18.3333 5.34993 18.3325 5.13368 18.3125 4.93259C18.2136 3.93876 17.7679 3.01148 17.0536 2.31347C16.9091 2.17224 16.7408 2.03647 16.3231 1.70235C15.9997 1.44359 15.9472 0.971622 16.206 0.648175C16.4648 0.324728 16.9367 0.272287 17.2602 0.531049C17.6839 0.875912 17.9178 1.06631 18.1138 1.25801C19.1154 2.23603 19.7291 3.53253 19.8669 4.91834C19.8922 5.15378 19.8922 5.41556 19.8922 5.71087V11.2C19.8922 14.1782 17.4783 16.5922 14.5 16.5922C13.0405 16.5922 11.7406 15.9283 10.875 14.8762C10.0094 15.9283 8.70945 16.5922 7.25 16.5922C4.27175 16.5922 1.85781 14.1782 1.85781 11.2V5.71087C1.85781 5.41556 1.85779 5.15378 1.88307 4.91834C2.02085 3.53253 2.63461 2.23603 3.63623 1.25801C3.83226 1.06631 4.06611 0.875912 4.48978 0.531049C4.81322 0.272287 5.28519 0.324728 5.54395 0.648175C5.80271 0.971622 5.75027 1.44359 5.42682 1.70235L5.00853 2.03647C4.59087 2.37059 4.42255 2.50636 4.27802 2.64759C3.56371 3.3456 3.11803 4.27288 3.01919 5.26671C2.99921 5.4678 2.9983 5.68405 2.9983 6.21891V6.91406C3.63084 6.6342 4.33226 6.47583 5.06876 6.47583C6.98176 6.47583 8.54876 8.04283 8.54876 9.95583V13.6225C8.54876 14.2208 8.03379 14.7058 7.43549 14.7058C6.83719 14.7058 6.32222 14.2208 6.32222 13.6225V9.95583C6.32222 9.26537 5.75922 8.70237 5.06876 8.70237C4.37829 8.70237 3.8153 9.26537 3.8153 9.95583V11.2C3.8153 13.3171 5.53153 15.0334 7.64864 15.0334C8.24694 15.0334 8.73197 14.5483 8.73197 13.95V10.2833C8.73197 8.35031 10.299 6.78331 12.232 6.78331C14.165 6.78331 15.732 8.35031 15.732 10.2833V13.95C15.732 14.5483 16.217 15.0334 16.8153 15.0334C18.9324 15.0334 20.6487 13.3171 20.6487 11.2V6.91406C20.6487 6.21891 20.6478 5.4678 20.6278 5.26671C20.529 4.27288 20.0833 3.3456 19.369 2.64759C19.2245 2.50636 19.0561 2.37059 18.6385 2.03647L18.2202 1.70235C17.8967 1.44359 17.8443 0.971622 18.103 0.648175C18.3618 0.324728 18.8338 0.272287 19.1572 0.531049C19.5809 0.875912 19.8148 1.06631 20.0108 1.25801C21.0124 2.23603 21.6262 3.53253 21.764 4.91834C21.7892 5.15378 21.7892 5.41556 21.7892 5.71087V11.2C21.7892 14.1782 19.3753 16.5922 16.397 16.5922C14.9375 16.5922 13.6376 15.9283 12.772 14.8762C11.9064 15.9283 10.6065 16.5922 9.14697 16.5922C6.16872 16.5922 3.75478 14.1782 3.75478 11.2V6.91406C3.12224 7.19391 2.57481 7.60156 2.13712 8.10659C1.90292 8.36535 1.50895 8.41779 1.22516 8.21903C0.941373 7.99403 0.873786 7.59406 1.06854 7.27561C1.82017 6.12248 3.03186 5.35175 4.40667 5.17738C5.78148 4.97862 7.18029 5.36459 8.24894 6.25446C8.54694 6.48946 8.59938 6.87943 8.36438 7.17743C8.12938 7.47543 7.73941 7.52787 7.44141 7.29287C6.63708 6.6552 5.63046 6.37535 4.62384 6.52072C3.61722 6.66609 2.72135 7.22152 2.13712 8.03385C1.90292 8.29261 1.50895 8.34505 1.22516 8.14629C0.941373 7.92129 0.873786 7.52132 1.06854 7.20287C1.82017 6.04974 3.03186 5.27901 4.40667 5.10464C5.78148 4.90588 7.18029 5.29185 8.24894 6.18172C8.54694 6.41672 8.59938 6.80669 8.36438 7.10469C8.12938 7.40269 7.73941 7.45513 7.44141 7.22013C6.63708 6.58246 5.63046 6.30261 4.62384 6.44798C3.61722 6.59335 2.72135 7.14878 2.13712 7.96111C1.90292 8.21987 1.50895 8.27231 1.22516 8.07355C0.941373 7.84855 0.873786 7.44858 1.06854 7.13013C1.82017 5.977 3.03186 5.20627 4.40667 5.0319C5.78148 4.83314 7.18029 5.21911 8.24894 6.10898C8.54694 6.34398 8.59938 6.73395 8.36438 7.03195C8.12938 7.32995 7.73941 7.38239 7.44141 7.14739C6.63708 6.50972 5.63046 6.22987 4.62384 6.37524C3.61722 6.52061 2.72135 7.07604 2.13712 7.88837C1.90292 8.14713 1.50895 8.19957 1.22516 8.00081C0.941373 7.77581 0.873786 7.37584 1.06854 7.05739C1.82017 5.90426 3.03186 5.13353 4.40667 4.95916C5.78148 4.7604 7.18029 5.14637 8.24894 6.03624C8.54694 6.27124 8.59938 6.66121 8.36438 6.95921C8.12938 7.25721 7.73941 7.30965 7.44141 7.07465C6.63708 6.43698 5.63046 6.15713 4.62384 6.3025C3.61722 6.44787 2.72135 7.0033 2.13712 7.81563C1.90292 8.07439 1.50895 8.12683 1.22516 7.92807C0.941373 7.70307 0.873786 7.3031 1.06854 6.98465L4.08565 0.281506Z" fill="white"/></svg>`;

const EVENT_SETUP_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`;

const EVENT_OVERVIEW_ICON = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0.750001 0C0.335787 -5.96046e-08 8.19241e-07 0.335786 7.59636e-07 0.75C7.00032e-07 1.16421 0.335787 1.5 0.750001 1.5L8.08333 1.5C8.49755 1.5 8.83333 1.16421 8.83333 0.750001C8.83333 0.335787 8.49755 7.15256e-07 8.08333 7.15256e-07L0.750001 0Z" fill="white"/></svg>`;

@Component({
  selector: "app-event-overview",
  standalone: true,
  imports: [
    CommonModule,
    EventDetailSidebarComponent,
    AddScheduleModalComponent,
    ConfirmDeleteModalComponent,
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

            <div class="flex-1 flex items-center gap-3 lg:gap-4">
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
                  {{ eventDates }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 ml-auto">
              <button
                (click)="openAddScheduleModal()"
                class="h-9 px-5 bg-primary-blue hover:bg-[#0385b5] rounded text-white font-semibold text-sm lg:text-base flex items-center gap-2 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3.75V14.25"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M3.75 9H14.25"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="hidden sm:inline">Add Schedule</span>
              </button>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-auto p-4 lg:p-8">
          <div class="max-w-[1366px] mx-auto">
            <div class="bg-white rounded shadow-md border border-[#E9E9E9]">
              <div
                class="px-6 py-5 border-b border-[#E9E9E9] flex items-center justify-between"
              >
                <h2 class="text-xl font-semibold text-[#181C32]">
                  Event Schedule
                </h2>
              </div>

              <div
                *ngIf="schedules.length === 0"
                class="py-16 px-6 flex flex-col items-center justify-center"
              >
                <div
                  class="w-16 h-16 bg-[#DEE1EB] rounded-full flex items-center justify-center mb-4"
                >
                  <svg
                    width="32"
                    height="32"
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
                      stroke="#4C546C"
                      stroke-width="2"
                    />
                    <path
                      d="M3 8H21"
                      stroke="#4C546C"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M8 3V7"
                      stroke="#4C546C"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16 3V7"
                      stroke="#4C546C"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p class="text-lg text-[#686868] text-center mb-6">
                  No schedules added yet
                </p>
                <button
                  (click)="openAddScheduleModal()"
                  class="h-9 px-5 bg-primary-blue hover:bg-[#0385b5] rounded text-white font-semibold text-base flex items-center gap-2 transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3.75V14.25"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3.75 9H14.25"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>Add Schedule</span>
                </button>
              </div>

              <div *ngIf="schedules.length > 0" class="overflow-x-auto">
                <div class="min-w-[1200px]">
                  <div
                    class="grid grid-cols-[60px_minmax(200px,1fr)_150px_120px_120px_minmax(200px,1fr)_100px] bg-[#F9FAFB] border-b border-[#E9E9E9]"
                  >
                    <div
                      class="px-4 py-4 text-sm font-semibold text-[#353846] text-center"
                    >
                      S.No
                    </div>
                    <div class="px-4 py-4 text-sm font-semibold text-[#353846]">
                      Title
                    </div>
                    <div class="px-4 py-4 text-sm font-semibold text-[#353846]">
                      Date
                    </div>
                    <div class="px-4 py-4 text-sm font-semibold text-[#353846]">
                      Start Time
                    </div>
                    <div class="px-4 py-4 text-sm font-semibold text-[#353846]">
                      End Time
                    </div>
                    <div class="px-4 py-4 text-sm font-semibold text-[#353846]">
                      Speaker
                    </div>
                    <div
                      class="px-4 py-4 text-sm font-semibold text-[#353846] text-center"
                    >
                      Actions
                    </div>
                  </div>

                  <div
                    *ngFor="let schedule of schedules; let i = index"
                    class="grid grid-cols-[60px_minmax(200px,1fr)_150px_120px_120px_minmax(200px,1fr)_100px] border-b border-[#E9E9E9] hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="px-4 py-5 flex items-center justify-center text-base font-semibold text-[#353846]"
                    >
                      {{ i + 1 }}
                    </div>
                    <div class="px-4 py-5 flex items-center">
                      <span class="text-base font-semibold text-[#353846]">{{
                        schedule.title
                      }}</span>
                    </div>
                    <div class="px-4 py-5 flex items-center">
                      <span class="text-base font-semibold text-[#353846]">{{
                        formatDate(schedule.date)
                      }}</span>
                    </div>
                    <div class="px-4 py-5 flex items-center">
                      <span class="text-base font-semibold text-[#353846]">{{
                        formatTime(schedule.startTime)
                      }}</span>
                    </div>
                    <div class="px-4 py-5 flex items-center">
                      <span class="text-base font-semibold text-[#353846]">{{
                        formatTime(schedule.endTime)
                      }}</span>
                    </div>
                    <div class="px-4 py-5 flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                      >
                        {{ getInitials(schedule.speakerName || "") }}
                      </div>
                      <span class="text-base font-semibold text-[#353846]">{{
                        schedule.speakerName
                      }}</span>
                    </div>
                    <div
                      class="px-4 py-5 flex items-center justify-center gap-2"
                    >
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
        </div>
      </main>
    </div>

    <app-add-schedule-modal
      [isOpen]="isScheduleModalOpen"
      [editMode]="editMode"
      [scheduleData]="editingSchedule"
      (close)="closeScheduleModal()"
      (save)="onScheduleSave($event)"
    ></app-add-schedule-modal>

    <app-confirm-delete-modal
      [isOpen]="isDeleteModalOpen"
      (confirm)="confirmDelete()"
      (cancel)="closeDeleteModal()"
    ></app-confirm-delete-modal>
  `,
  styles: [],
})
export class EventOverviewComponent implements OnInit {
  eventName = "ENGIMACH 2023";
  eventDates = "01 Dec - 05 Dec 2023";
  activeRoute = "/event/overview";
  backButtonLabel = "Back to KQOL Communication";
  eventId: string = "";

  schedules: Schedule[] = [];
  isScheduleModalOpen = false;
  editMode = false;
  editingSchedule: any = null;
  isDeleteModalOpen = false;
  scheduleToDelete: string | null = null;

  menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: DASHBOARD_ICON,
      action: () => this.navigateTo("dashboard"),
    },
    {
      label: "Event Setup",
      icon: EVENT_SETUP_ICON,
      action: () => this.navigateTo("setup"),
    },
    {
      label: "Event Overview",
      icon: EVENT_OVERVIEW_ICON,
      action: () => this.navigateTo("overview"),
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get("id") || "";

    this.route.queryParams.subscribe((params) => {
      if (params["eventName"]) {
        this.eventName = params["eventName"];
      }
      if (params["eventDates"]) {
        this.eventDates = params["eventDates"];
      }
    });

    this.loadSchedules();
  }

  loadSchedules() {
    this.schedules = this.scheduleService.getSchedulesByEvent(this.eventId);
  }

  openAddScheduleModal() {
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
    }
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.scheduleToDelete = null;
  }

  formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatTime(timeString: string): string {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  }

  getInitials(name: string): string {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  navigateTo(page: string) {
    switch (page) {
      case "dashboard":
        this.router.navigate([`/event/${this.eventId}/dashboard`]);
        break;
      case "setup":
        this.router.navigate([`/event/${this.eventId}/setup`]);
        break;
      case "overview":
        this.router.navigate([`/event/${this.eventId}/overview`]);
        break;
    }
  }

  onBackToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  onLogout() {
    this.router.navigate(["/"]);
  }
}
