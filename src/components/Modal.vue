<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <!-- <i class="fas fa-angle-left" @click="leftContent"></i> -->
            <slot name="left">
            </slot>
          </div>
          <div>
            <div class="modal-body">
              <slot name="body"> 
                  
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
        
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    trip: Object,
    index: Number
  }
}
</script>

<style>
 
</style>