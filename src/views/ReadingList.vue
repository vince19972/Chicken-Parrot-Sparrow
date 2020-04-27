<template>
  <div class="list -safe-container-full">
    <div class="page-title">
      <h1 class="page-title__text">Reading List.</h1>
    </div>
    <div class="list__container -side-main-container">
      <div class="list__side -side-main-container__side types" ref="menu">
        <ul class="types__list">
          <li
            v-for="(contentType, index) in readingListsTypes"
            :key="contentType + index"
            :class="['types__list-item', index === 0 ? '-is-active' : '']"
            :data-type="contentType"
            @click="onMenuClicked"
          >
            <button class="types__list-btn">
              {{ getFmtTypeText(contentType) }}
            </button>
          </li>
        </ul>
      </div>
      <div
        class="list__main -side-main-container__main readings"
        ref="readings"
      >
        <ul class="readings__list">
          <transition-group name="fade" mode="out-in">
            <li
              v-for="(item, index) in activeReadingList"
              :key="activeContent + index + item.url"
              class="readings__list-item"
            >
              <div class="readings__list-item-info -flex">
                <p class="__info-title">
                  author: <span class="__info-text">{{ item.author }}</span>
                </p>
                <p class="__info-title">
                  type:
                  <span
                    v-for="(tag, tagIndex) in item.tag"
                    :key="index + tagIndex + tag"
                    class="__info-text"
                    >{{ tag
                    }}{{ tagIndex === item.tag.length - 1 ? "" : ", " }}</span
                  >
                </p>
              </div>
              <a
                :href="item.url"
                target="_blank"
                class="readings__list-item-link"
                >{{ item.title }}</a
              >
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import readingLists from "@/assets/content/readingList.json";
import { Meta } from "@/decorator.js";

enum ContentTypes {
  Seeing = "seeing",
  Chicken = "chicken",
  Parrot = "parrot",
  Sparrow = "sparrow",
}

@Component({
  name: "ReadingList",
})
export default class ReadingList extends Vue {
  @Meta
  metaInfo() {
    return {
      titleTemplate: "Reading List | %s",
    };
  }

  // data
  activeContent: ContentTypes = ContentTypes.Chicken;
  readingListsTypes = [
    ContentTypes.Chicken,
    ContentTypes.Parrot,
    ContentTypes.Sparrow,
    ContentTypes.Seeing,
  ];
  fmtReadingLists = {
    meat: [],
    pet: [],
    city: [],
    boundary: [],
  };

  // computed
  get activeReadingList() {
    switch (this.activeContent) {
      case ContentTypes.Chicken:
        return this.fmtReadingLists.meat;
      case ContentTypes.Parrot:
        return this.fmtReadingLists.pet;
      case ContentTypes.Sparrow:
        return this.fmtReadingLists.city;
      case ContentTypes.Seeing:
        return this.fmtReadingLists.boundary;
      default:
        return this.fmtReadingLists.meat;
    }
  }

  // getter methods
  getFmtTypeText(text: ContentTypes) {
    switch (text) {
      case ContentTypes.Chicken:
        return "chicken / meat";
      case ContentTypes.Parrot:
        return "parrot / pet";
      case ContentTypes.Sparrow:
        return "sparrow / city";
      case ContentTypes.Seeing:
        return "seeing / boundary";
      default:
        return "general";
    }
  }

  // user events
  onMenuClicked(event: any) {
    this.activeContent = event.currentTarget.dataset.type;
    const items = document.querySelectorAll(".types__list-item");

    items.forEach((item: any) => {
      if (item.dataset.type === this.activeContent) {
        item.classList.add("-is-active");
      } else {
        item.classList.remove("-is-active");
      }
    });
  }

  // cycle
  mounted() {
    readingLists.list.forEach((item) => {
      item.type.forEach((type) => {
        this.fmtReadingLists[type].push(item);
      });
    });
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.page-title {
  @include -f-main-b;
  font-size: 64px;
  margin: 48px 0 200px 0;
  text-decoration: underline;
}

.list {
  max-width: 100vw;
}

.list__side {
  margin-top: -40px;
  position: sticky;
  top: 0;
  align-self: flex-start;
  padding-top: 48px;
}
.list__main {
  padding-bottom: 40vh;
}

.types__list-item {
  position: relative;
  text-indent: 16px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
  &:before {
    content: "";
    position: absolute;
    top: calc(50% - 2px / 2);
    left: 0;
    width: 8px;
    height: 2px;
    background-color: black;

    transition: all 0.3s;
    transform-origin: left center;
  }
}
.types__list-btn {
  @include -f-main-b;
  font-size: 1.8vw;
  letter-spacing: -1.25px;

  transition: all 0.3s;
}

.readings {
  @include -f-main-b;
  font-size: 4vw;
}
.readings__list {
  margin-right: 2vw;
}
.readings__list-item {
  &:not(:last-child) {
    margin-bottom: 88px;
  }
}
.readings__list-item-link {
  text-decoration: none;
  position: relative;

  &:before {
    content: "→";
    position: absolute;
    bottom: 16px;
    right: -80px;

    opacity: 0;
    transition: all 0.3s;
  }
}
.readings__list-item-info {
  font-weight: lighter;
  font-size: 18px;
  margin-left: 6px;
  margin-bottom: 24px;

  & .__info-title {
    word-wrap: break-word;

    &:not(:last-child) {
      position: relative;
      margin-right: 16px;

      &:after {
        content: "/";
        position: absolute;
        right: -11px;
        top: 1px;
      }
    }
  }
}

// user events
.types__list-item {
  @include hover {
    opacity: 1;
    cursor: pointer;

    &:before {
      transform: scaleX(2);
      transform-origin: left center;
      transition: all 0.3s;
    }
    & .types__list-btn {
      transform: translate3d(12px, 0, 0);
      transition: all 0.3s;
    }
  }
}

.readings__list-item {
  transition: all 0.3s;
  & > * {
    transition: all 0.3s;
  }
  @include hover {
    transform: translate3d(8px, 0, 0);

    & .readings__list-item-link:before {
      transform: translate3d(24px, 0, 0);
      opacity: 1;
      transition: all 0.3s;
    }
  }
}

// states
.types__list-item {
  opacity: 0.85;
  transition: all 0.3s;

  &.-is-active {
    pointer-events: none;
    opacity: 1;

    &:before {
      transform: scaleX(7);
      transform-origin: left center;
      transition: all 0.3s;
    }
    & .types__list-btn {
      transform: translate3d(48px, 0, 0);
    }
  }
}
</style>
