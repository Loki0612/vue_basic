<template>
  <div v-if="!item.hidden" class="side-item-container">
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <div class="triangle-right"></div>
        <div class="side-item" :index="resolvePath(onlyOneChild.path)">
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </div>
      </app-link>
    </template>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (!item.hidden && item.type === "1") {
          this.onlyOneChild = item;
          return true;
        } else {
          return false;
        }
      });

      // 当只有一个子路由器时，默认显示子路由器
      if (showingChildren.length === 1) {
        return true;
      }

      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
